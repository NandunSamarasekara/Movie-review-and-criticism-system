package com.moviereviewandcriticismsystem.movie_review_and_criticism_system.repository;

import com.moviereviewandcriticismsystem.movie_review_and_criticism_system.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {}
