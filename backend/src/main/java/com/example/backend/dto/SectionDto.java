package com.example.backend.dto;

import lombok.*;

import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SectionDto {
    private Long id;
    private String title;
    private List<SubSectionDto> subSections;
}
