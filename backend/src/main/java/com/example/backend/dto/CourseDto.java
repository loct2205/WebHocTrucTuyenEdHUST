package com.example.backend.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseDto {
    private Long id;
    private String courseName;
    private String courseDescription;
    private String instructor;
    private String whatYouWillLearn;
    private String courseContent;
    private Double price;
    private String thumbnail;
    private RatingAndReviewDto rating;
    private List<SectionDto> sections;
    private TagDto tag;
}