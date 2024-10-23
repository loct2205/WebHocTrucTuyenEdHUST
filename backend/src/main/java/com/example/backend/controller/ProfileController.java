package com.example.backend.controller;

import com.example.backend.dto.UserDto;
import com.example.backend.dto.profile.UpdateProfileDto;
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
    private final UserMapper _userMapper;

    public ProfileController(ProfileService profileService, UserMapper userMapper) {
        _profileService = profileService;
        _userMapper = userMapper;
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
}
