package com.moviereviewandcriticismsystem.movie_review_and_criticism_system.controller;

import com.moviereviewandcriticismsystem.movie_review_and_criticism_system.Movie;
import com.moviereviewandcriticismsystem.movie_review_and_criticism_system.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {
    @Autowired
    private MovieRepository movieRepository;

    @GetMapping
    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    @GetMapping("/{id}")
    public Movie getMoviebyId(@PathVariable Long id) {
        return movieRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }
}