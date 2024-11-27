package com.example.backend.utils.types;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AverageRatingResponse {
    private Double averageRating;

    private Integer totalRatings;
}
