package com.example.backend.utils.types;

import com.example.backend.dto.CourseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryType {
    private Long id;
    private String name;
    private String description;
    private List<CourseDto> courses;
}
