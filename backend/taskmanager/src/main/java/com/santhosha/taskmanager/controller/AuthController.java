package com.santhosha.taskmanager.controller;

import com.santhosha.taskmanager.entity.User;
import com.santhosha.taskmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.santhosha.taskmanager.dto.LoginResponse;
import com.santhosha.taskmanager.security.JwtUtil;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }
    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody User user) {

        User loggedInUser = userService.loginUser(
                user.getEmail(),
                user.getPassword()
        );

        String token = jwtUtil.generateToken(
                loggedInUser.getEmail()
        );

        return new LoginResponse(token);
    }
}