package com.moviereviewandcriticismsystem.movie_review_and_criticism_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.moviereviewandcriticismsystem.movie_review_and_criticism_system.repository")
@EntityScan(basePackages = "com.moviereviewandcriticismsystem.movie_review_and_criticism_system")
public class MovieReviewAndCriticismSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(MovieReviewAndCriticismSystemApplication.class, args);
    }
}