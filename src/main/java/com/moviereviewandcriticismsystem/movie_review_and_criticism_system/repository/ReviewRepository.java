package com.moviereviewandcriticismsystem.movie_review_and_criticism_system.repository;

import com.moviereviewandcriticismsystem.movie_review_and_criticism_system.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {}
