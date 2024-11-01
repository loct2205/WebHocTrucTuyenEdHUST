package com.example.backend.utils.types;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseDataWithStats {
    private Long id;
    private String courseName;
    private String courseDescription;
    private Integer totalStudentsEnrolled;
    private Double totalAmountGenerated;
}
