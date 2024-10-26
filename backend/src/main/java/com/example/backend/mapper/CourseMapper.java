package com.example.backend.mapper;

import com.example.backend.dto.CourseDto;
import com.example.backend.dto.RatingAndReviewDto;
import com.example.backend.dto.SectionDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.*;
import com.example.backend.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class CourseMapper {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private SectionMapper sectionMapper;
    private final CategoryRepository categoryRepository;
    public CourseDto convertToDto(Course course) {
        CourseDto newCourseDto = new CourseDto().builder()
                .id(course.getId())
                .courseName(course.getCourseName())
                .courseDescription(course.getCourseDescription())
                .instructor(userMapper.convertToDto(course.getInstructor()))
                .whatYouWillLearn(course.getWhatYouWillLearn())
                .studentsEnrolled(course.getStudentsEnrolled() != null ?
                        course.getStudentsEnrolled().stream()
                                .map(element -> userMapper.convertToDto(element))
                                .toList() : new ArrayList<>())
                .status(course.getStatus().toString())
                .categoryName(course.getCategory().getName())
                .instructions(course.getInstructions() != null ?
                        new ArrayList<>(course.getInstructions()) : new ArrayList<>())
                .price(course.getPrice())
                .thumbnail(course.getThumbnail())
                .rating(course.getRating() != null ?
                        course.getRating().stream()
                                .map(element -> modelMapper.map(element, RatingAndReviewDto.class))
                                .toList() : new ArrayList<>())
                .sections(course.getSections() != null ?
                        course.getSections().stream()
                                .map(element -> sectionMapper.convertToDto(element))
                                .toList() : new ArrayList<>())
                .tag(course.getTag() != null ?
                        new ArrayList<>(course.getTag()) : new ArrayList<>())
                .build();
        return newCourseDto;
    }
    public Course convertToEntity(CourseDto courseDto) {
        Course course = new Course();
        course.setId(courseDto.getId());
        course.setCourseName(courseDto.getCourseName());
        course.setCourseDescription(courseDto.getCourseDescription());
        course.setWhatYouWillLearn(courseDto.getWhatYouWillLearn());
        course.setPrice(courseDto.getPrice());
        course.setThumbnail(courseDto.getThumbnail());

        // Set instructor if exists
        course.setInstructor(courseDto.getInstructor() != null ?
                userMapper.convertToEntity(courseDto.getInstructor()) : null);
        // Set studentsEnrolled if exists
        course.setStudentsEnrolled(courseDto.getStudentsEnrolled() != null ?
                courseDto.getStudentsEnrolled().stream()
                        .map(element -> userMapper.convertToEntity(element))
                        .toList() : new ArrayList<>());

        course.setStatus(Course.Status.valueOf(courseDto.getStatus()));

        Category category = categoryRepository.findByName(courseDto.getCategoryName());
        course.setCategory(category);

        // Set instructions if not null
        course.setInstructions(courseDto.getInstructions() != null ?
                new ArrayList<>(courseDto.getInstructions()) : new ArrayList<>());

        // Set rating if exists
        course.setRating(courseDto.getRating() != null ?
                courseDto.getRating().stream()
                        .map(element -> modelMapper.map(element, RatingAndReview.class))
                        .toList() : new ArrayList<>());

        // Set sections if exists
        course.setSections(courseDto.getSections() != null ?
                courseDto.getSections().stream()
                        .map(element -> sectionMapper.convertToEntity(element))
                        .toList() : new ArrayList<>());

        // Set tags if not null
        course.setTag(courseDto.getTag() != null ?
                new ArrayList<>(courseDto.getTag()) : new ArrayList<>());

        return course;
    }

}
