package com.example.backend.dto;

import lombok.*;

import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseProgressDto {
    private Long id;
    private UserDto user;
    private CourseDto course;
    private List<SubSectionDto> completedVideos;
}