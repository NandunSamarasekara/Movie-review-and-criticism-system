package com.moviereviewandcriticismsystem.movie_review_and_criticism_system.controller;

import com.moviereviewandcriticismsystem.movie_review_and_criticism_system.Movie;
import com.moviereviewandcriticismsystem.movie_review_and_criticism_system.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @GetMapping("/search")
    public List<Movie> searchMovieByTitle(@RequestParam(required = false) String title,
                                          @RequestParam(required = false) String director,
                                          @RequestParam(required = false) Integer year) {
        if (title != null) {
            return movieRepository.findByTitleContainingIgnoreCase(title);
        }
        if (director != null) {
            return movieRepository.findByDirectorContainingIgnoreCase(director);
        }
        if (year != null) {
            return movieRepository.findByYear(year);
        }
        return movieRepository.findAll();
    }

    @GetMapping("/with-ratings")
    public List<Map<String, Object>> getMoviesWithRatings() {
        List<Object[]> results = movieRepository.findMoviesWithAverageRating();
        return results.stream().map(result -> {
            Map<String, Object> map = new HashMap<>();
            map.put("movie", result[0]);
            map.put("averageRating", result[1] != null ? result[1] : 0.0);
            return map;
        }).collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody Movie movie) {
        movie.setId(id);
        return movieRepository.save(movie);
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable Long id) {
        movieRepository.deleteById(id);
    }

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }
}