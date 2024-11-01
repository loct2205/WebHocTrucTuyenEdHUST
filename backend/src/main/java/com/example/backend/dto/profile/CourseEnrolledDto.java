package com.example.backend.dto.profile;

import com.example.backend.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseEnrolledDto {
    private Long id;
    private String courseName;
    private String courseDescription;
    private UserDto instructor;
    private String whatYouWillLearn;
    private String status;
    private String categoryName;
    private List<String> instructions;
    private Double price;
    private String thumbnail;
    private List<String> tag;
    private String totalDuration;
    private double progressPercentage;

}
