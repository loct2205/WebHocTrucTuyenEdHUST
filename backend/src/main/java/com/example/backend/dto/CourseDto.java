package com.example.backend.dto;

import com.example.backend.entity.User;
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
    private UserDto instructor;
    private String whatYouWillLearn;
    private List<UserDto> studentsEnrolled;
    private String status;
    private String categoryName;
    private List<String> instructions;
    private Double price;
    private String thumbnail;
    private List<RatingAndReviewDto> rating;
    private List<SectionDto> sections;
    private List<String> tag;
}