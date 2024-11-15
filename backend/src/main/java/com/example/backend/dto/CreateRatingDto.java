package com.example.backend.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
public class CreateRatingDto {
    @NotNull
    private final Integer rating;

    @NotEmpty
    private final String review;

    @NotNull
    private final Long courseId;
}
