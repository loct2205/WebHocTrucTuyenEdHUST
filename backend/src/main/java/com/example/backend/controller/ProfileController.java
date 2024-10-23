package com.example.backend.controller;

import com.example.backend.dto.UserDto;
import com.example.backend.dto.profile.UpdateProfileDto;
import com.example.backend.dto.profile.UserDetailDto;
import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/profiles")
@RestController
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
}
