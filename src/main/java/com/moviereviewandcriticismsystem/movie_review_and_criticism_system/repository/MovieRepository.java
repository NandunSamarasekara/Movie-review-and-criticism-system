package com.moviereviewandcriticismsystem.movie_review_and_criticism_system.repository;

import com.moviereviewandcriticismsystem.movie_review_and_criticism_system.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {}
