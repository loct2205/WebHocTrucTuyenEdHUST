package com.example.backend.service;

import com.example.backend.dto.CategoryDto;
import com.example.backend.dto.CategoryPageDetailDto;
import com.example.backend.entity.Category;
import com.example.backend.entity.Course;
import com.example.backend.mapper.CourseMapper;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.utils.helpers.Random;
import com.example.backend.utils.types.CategoryType;
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

    public CategoryPageDetailDto getCategoryPageDetails(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        List<Course> courses = category.getCourses().stream().filter(course -> course.getStatus().equals(Course.Status.PUBLISHED)).toList();
//        if(courses.isEmpty()) {
//            throw new RuntimeException("No courses found for the category");
//        }
        List<Category> categoriesOther = categoryRepository.findByIdNot(categoryId);
        int randomIndex = Random.getRandomInt(categoriesOther.size());
        Category differentCategory = categoriesOther.get(randomIndex);

        List<Category> allCategories = categoryRepository.findAll();
        List<Course> allCourses = allCategories.stream()
                .map(Category::getCourses)
                .flatMap(List::stream)
                .filter(course -> course.getStatus().equals(Course.Status.PUBLISHED))
                .toList();
        List<Course> mostSellingCourses = allCourses.stream()
                .sorted((c1, c2) -> c2.getStudentsEnrolled().size() - c1.getStudentsEnrolled().size())
                .limit(10)
                .toList();
        return CategoryPageDetailDto.builder()
                .selectedCategory(CategoryType.builder().id(category.getId()).name(category.getName()).description(category.getDescription())
                        .courses(courseMapper.convertToDtoList(courses)).build())
                .differentCategory(CategoryType.builder().id(differentCategory.getId()).name(differentCategory.getName()).description(differentCategory.getDescription())
                        .courses(courseMapper.convertToDtoList(differentCategory.getCourses().stream().filter(course -> course.getStatus().equals(Course.Status.PUBLISHED)).toList())).build())
                .mostSellingCourses(courseMapper.convertToDtoList(mostSellingCourses))
                .build();
    }
}
