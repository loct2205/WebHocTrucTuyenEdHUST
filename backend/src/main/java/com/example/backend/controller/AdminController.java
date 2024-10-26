package com.example.backend.controller;

import com.example.backend.dto.RegisterUserDto;
import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/admins")
@RestController
@CrossOrigin("*")
public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> createInstructor(@RequestBody RegisterUserDto registerUserDto) {
        User createdInstructor = userService.createInstructor(registerUserDto);

        return ResponseEntity.ok(createdInstructor);
    }
}