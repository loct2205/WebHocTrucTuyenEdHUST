package com.example.backend.utils.types;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AllRatingReviewResponse {
    private Long id;

    private Integer rating;

    private String review;

    private CourseInfo course;

    private UserInfo user;
}

