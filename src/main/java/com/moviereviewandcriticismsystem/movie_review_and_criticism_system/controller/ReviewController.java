package com.moviereviewandcriticismsystem.movie_review_and_criticism_system.controller;

import com.moviereviewandcriticismsystem.movie_review_and_criticism_system.Review;
import com.moviereviewandcriticismsystem.movie_review_and_criticism_system.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @GetMapping("/{id}")
    public Review getReviewById(@PathVariable Long id) {
        return reviewRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewRepository.save(review);
    }

    @PutMapping("/{id}")
    public Review updateReview(@PathVariable Long id, @RequestBody Review review) {
        Review existingReview = reviewRepository.findById(id).orElse(null);
        if (existingReview != null) {
            existingReview.setMovieId(review.getMovieId());
            existingReview.setReviewerName(review.getReviewerName());
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