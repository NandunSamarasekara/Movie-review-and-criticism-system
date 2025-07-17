package com.moviereviewandcriticismsystem.movie_review_and_criticism_system.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class WelcomeController {
    @GetMapping("/")
    public Map<String, String> welcome() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome to Movie Review and Criticism System!");
        return response;
    }
}