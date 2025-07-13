package com.moviereviewandcriticismsystem.movie_review_and_criticism_system.controller;

import com.moviereviewandcriticismsystem.movie_review_and_criticism_system.User;
import com.moviereviewandcriticismsystem.movie_review_and_criticism_system.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    //Get all users
    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    //Get user by ID
    @GetMapping("/{id}")
    public User getUserbyId(@PathVariable long id) {
        return userRepository.findById(id).orElse(null);
    }

    //Create a user
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        return new ResponseEntity<>(userRepository.save(user), HttpStatus.CREATED);
    }

    //Update user
    @PutMapping("/{id}")
    public User updateUser(@PathVariable long id, @RequestBody User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getLastName());
            existingUser.setEmail(user.getEmail());
            return userRepository.save(existingUser);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable long id) {
        userRepository.deleteById(id);
        return "User deleted successfully";
    }
}
