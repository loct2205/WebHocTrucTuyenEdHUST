package com.example.backend.dto;

import com.example.backend.utils.types.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryPageDetailDto {
    CategoryType selectedCategory;
    CategoryType differentCategory;
    List<CourseDto> mostSellingCourses;
}
