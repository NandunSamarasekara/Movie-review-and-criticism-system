package com.moviereviewandcriticismsystem.movie_review_and_criticism_system.controller;

import com.moviereviewandcriticismsystem.movie_review_and_criticism_system.Review;
import com.moviereviewandcriticismsystem.movie_review_and_criticism_system.repository.ReviewRepository;
import com.moviereviewandcriticismsystem.movie_review_and_criticism_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @GetMapping("/{id}")
    public Review getReviewById(@PathVariable Long id) {
        return reviewRepository.findById(id).orElse(null);
    }

    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        if (review.getUser() == null || review.getUser().getId() == null ||
                userRepository.findById(review.getUser().getId()).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (review.getMovie() == null || review.getMovie().getId() == null ||
                review.getMovie().getId() <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(reviewRepository.save(review), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public Review updateReview(@PathVariable Long id, @RequestBody Review review) {
        Review existingReview = reviewRepository.findById(id).orElse(null);
        if (existingReview != null) {
            existingReview.setMovie(review.getMovie());
            existingReview.setUser(review.getUser());
            existingReview.setComment(review.getComment());
            existingReview.setRating(review.getRating());
            return reviewRepository.save(existingReview);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable Long id) {
        reviewRepository.deleteById(id);
        return "Review deleted successfully";
    }
}