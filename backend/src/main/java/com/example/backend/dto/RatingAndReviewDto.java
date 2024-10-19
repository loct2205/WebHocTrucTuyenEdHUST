package com.example.backend.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RatingAndReviewDto {
    private Long id;
    private Double rating;
    private String review;
}
