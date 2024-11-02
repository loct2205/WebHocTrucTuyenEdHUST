package com.example.backend.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubSectionDto {
    private Long id;
    private String title;
    private String videoUrl;
    private String description;
    private Long sectionId;
    private String timeDuration;
    private String additionalUrl;
}
