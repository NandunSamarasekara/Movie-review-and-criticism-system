package com.moviereviewandcriticismsystem.movie_review_and_criticism_system;

import jakarta.persistence.*;

@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String imdbId;
    private String title;
    private String language;
    private int year;
    private String director;
    @Column(name = "poster_url")
    private String posterUrl;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getImdbId() { return imdbId; }
    public void setImdbId(String imdbId) { this.imdbId = imdbId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public int getYear() { return year; }
    public void setYear(int year) {
        if (year <= 0) throw new IllegalArgumentException("Year must be positive");
        this.year = year; }
    public String getDirector() { return director; }
    public void setDirector(String director) { this.director = director; }
    public String getPosterUrl() { return posterUrl; }
    public void setPosterUrl(String posterUrl) { this.posterUrl = posterUrl; }
}