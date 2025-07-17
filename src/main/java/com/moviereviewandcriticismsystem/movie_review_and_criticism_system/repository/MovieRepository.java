package com.moviereviewandcriticismsystem.movie_review_and_criticism_system.repository;

import com.moviereviewandcriticismsystem.movie_review_and_criticism_system.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByTitleContainingIgnoreCase(String title);
    List<Movie> findByDirectorContainingIgnoreCase(String director);
    List<Movie> findByYear(int year);

    @Query("SELECT m, AVG(r.rating) FROM Movie m LEFT JOIN Review r ON m.id = r.movie.id GROUP BY m.id")
    List<Object[]> findMoviesWithAverageRating();
}
