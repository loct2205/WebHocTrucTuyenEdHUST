package com.example.backend.controller;

import com.example.backend.dto.progress.UpdateCourseProgressDto;
import com.example.backend.entity.User;
import com.example.backend.service.CourseProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/course-progress")
@CrossOrigin("*")
public class CourseProgressController {
    private final CourseProgressService _courseProgressService;

    public CourseProgressController(CourseProgressService courseProgressService) {
        this._courseProgressService = courseProgressService;
    }

    @PutMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> updateCourseProgress(@RequestBody UpdateCourseProgressDto request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            return ResponseEntity.ok(_courseProgressService.updateCourseProgress(currentUser, request));
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{courseId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Double> getCourseProgress(@PathVariable Long courseId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            return ResponseEntity.ok(_courseProgressService.getCourseProgress(currentUser, courseId));
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
