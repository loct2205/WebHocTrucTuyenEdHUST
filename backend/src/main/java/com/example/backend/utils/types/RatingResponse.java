package com.example.backend.utils.types;

import com.example.backend.dto.CourseDto;
import com.example.backend.dto.profile.UserDetailDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class RatingResponse {
    private Long id;
    private int rating;
    private String review;
    private UserDetailDto user;
    private CourseDto course;
}
