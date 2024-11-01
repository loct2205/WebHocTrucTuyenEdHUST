package com.example.backend.controller;

import com.example.backend.dto.UserDto;
import com.example.backend.dto.profile.CourseEnrolledDto;
import com.example.backend.dto.profile.UpdateProfileDto;
import com.example.backend.dto.profile.UserDetailDto;
import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.service.ProfileService;
import com.example.backend.utils.types.CourseDataWithStats;
import com.example.backend.utils.types.GetAllInstructorsResponse;
import com.example.backend.utils.types.GetAllStudentResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("/profiles")
@RestController
@CrossOrigin("*")
public class ProfileController {
    private final ProfileService _profileService;

    public ProfileController(ProfileService profileService) {
        _profileService = profileService;
    }

    @PatchMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UpdateProfileDto> updateProfile(@Valid @RequestBody UpdateProfileDto request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            var response = _profileService.updateProfile(currentUser, request);
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserDetailDto> getUserDetail() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            var response = _profileService.getUserDetail(currentUser);
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    // User
    @DeleteMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> deleteAccount() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            var response = _profileService.deleteAccount(currentUser);
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/avatar")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> updateProfileImage(@RequestBody() MultipartFile file) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            var response = _profileService.updateUserProfileImage(currentUser, file);
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/all-student")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<GetAllStudentResponse> getAllStudent() {
        try {
            var response = _profileService.getAllStudents();
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/all-instructor")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<GetAllInstructorsResponse> getAllInstructor() {
        try {
            var response = _profileService.getAllInstructors();
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/course-enrolled")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CourseEnrolledDto>> getEnrolledCourse() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            var response = _profileService.getEnrolledCourse(currentUser.getId());
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/instructor-dashboard")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<List<CourseDataWithStats>> getInstructorDashboard() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            var response = _profileService.getInstructorDashboard(currentUser);
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
