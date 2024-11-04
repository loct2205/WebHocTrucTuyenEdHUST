package com.example.backend.controller;

import com.example.backend.dto.CreateRatingDto;
import com.example.backend.entity.RatingAndReview;
import com.example.backend.entity.User;
import com.example.backend.service.RatingService;
import com.example.backend.utils.types.RatingResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ratings")
public class RatingController {
    private final RatingService _ratingService;

    public RatingController(RatingService ratingService) {
        this._ratingService = ratingService;
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<RatingResponse> createRating(@Valid @RequestBody CreateRatingDto createRatingDto) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            RatingResponse newRating = _ratingService.createRating(createRatingDto, currentUser.getId());
            return ResponseEntity.ok(newRating);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
