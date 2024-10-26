package com.example.backend.service;

import com.example.backend.dto.CourseDto;
import com.example.backend.entity.*;
import com.example.backend.mapper.CourseMapper;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.SectionRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.util.Uploader;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CategoryRepository categoryRepository;
    private final CourseRepository courseRepository;
    private final SectionRepository sectionRepository;
    private final ModelMapper modelMapper;
    private final CourseMapper courseMapper;
    private final UserRepository userRepository;
    private final Uploader uploader;
    public CourseDto createCourse(CourseDto courseDto, MultipartFile file, Integer userId) {
        Category category = categoryRepository.findByName(courseDto.getCategoryName());
        String fileUrl = uploader.uploadFile(file);
        User instructor = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));
        if (instructor.getRole().getName() != RoleEnum.INSTRUCTOR && instructor.getRole().getName() != RoleEnum.ADMIN) {
            throw new RuntimeException("Only instructors or admins can create courses");
        }
        Course newCourse = Course.builder()
                .courseName(courseDto.getCourseName())
                .courseDescription(courseDto.getCourseDescription())
                .thumbnail(fileUrl)
                .status(Course.Status.DRAFT)
                .price(courseDto.getPrice())
                .tag(courseDto.getTag())
                .whatYouWillLearn(courseDto.getWhatYouWillLearn())
                .instructions(courseDto.getInstructions())
                .category(category)
                .build();
        // Check if the managedcourses field is null, if not add the new course to the list
        if (instructor.getManagedCourses() == null) {
            instructor.setManagedCourses(new ArrayList<>());
        }
        instructor.getManagedCourses().add(newCourse);
        userRepository.save(instructor);
        newCourse.setInstructor(instructor);
        return courseMapper.convertToDto(courseRepository.save(newCourse));
    }
    public void updateSectionToCourse(Long courseId, Long sectionId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        course.getSections().add(section);
        courseRepository.save(course);
    }

    public List<CourseDto> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return courses.stream().map(courseMapper::convertToDto).toList();
    }

    public CourseDto getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return courseMapper.convertToDto(course);
    }

    public List<CourseDto> getCoursesByInstructorId(Integer instructorId) {
        User instructor = userRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));
        List<Course> courses = courseRepository.findByInstructorId(instructorId);
        return courses.stream().map(courseMapper::convertToDto).toList();
    }
}
