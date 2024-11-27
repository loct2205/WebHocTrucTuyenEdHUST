package com.example.backend.service;

import com.example.backend.dto.CategoryDto;
import com.example.backend.entity.Category;
import com.example.backend.entity.Course;
import com.example.backend.mapper.CourseMapper;
import com.example.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CourseMapper courseMapper;
    public CategoryDto createCategory(CategoryDto categoryDto) {
        // Check existing name
        Optional<Category> existingCategory = Optional.ofNullable(categoryRepository.findByName(categoryDto.getName()));
        if (existingCategory.isPresent()) {
            throw new RuntimeException("Category with the same name already exists");
        }
        Category category = Category.builder()
                .name(categoryDto.getName())
                .description(categoryDto.getDescription())
                .build();
        categoryDto.setId(categoryRepository.save(category).getId());
        return categoryDto;
    }

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(category -> CategoryDto.builder()
                        .id(category.getId())
                        .name(category.getName())
                        .description(category.getDescription())
                        .courseId(category.getCourses().stream().map(Course::getId).toList())
                        .build())
                .toList();
    }

    public CategoryDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .courseId(category.getCourses().stream().map(Course::getId).toList())
                .build();
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        // Check courses associated with the category
        if (!category.getCourses().isEmpty()) {
            throw new RuntimeException("Category has courses associated with it");
        }
        categoryRepository.delete(category);
    }

    public String updateCategory(Long id, CategoryDto categoryDto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        categoryRepository.save(category);
        return "Category updated successfully";
    }
}
