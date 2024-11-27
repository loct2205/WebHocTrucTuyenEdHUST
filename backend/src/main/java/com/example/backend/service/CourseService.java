package com.example.backend.service;

import com.example.backend.dto.CourseDto;
import com.example.backend.dto.RatingAndReviewDto;
import com.example.backend.entity.*;
import com.example.backend.mapper.CourseMapper;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.*;
import com.example.backend.util.Uploader;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CategoryRepository categoryRepository;
    private final CourseRepository courseRepository;
    private final SectionRepository sectionRepository;
    private final SubSectionRepository subSectionRepository;
    private final ModelMapper modelMapper;
    private final CourseMapper courseMapper;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final Uploader uploader;
    private final SectionService sectionService;


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
        return courses.stream().map(course -> CourseDto.builder()
                .id(course.getId())
                .categoryName(course.getCategory().getName())
                .courseDescription(course.getCourseDescription())
                .instructor(userMapper.convertToDto(course.getInstructor()))
                .courseName(course.getCourseName())
                .tag(course.getTag())
                .price(course.getPrice())
                .thumbnail(course.getThumbnail())
                .whatYouWillLearn(course.getWhatYouWillLearn())
                .instructions(course.getInstructions())
                .rating(course.getRating().stream().map(ratingAndReview -> RatingAndReviewDto.builder()
                        .rating((double) ratingAndReview.getRating())
                        .review(ratingAndReview.getReview())
                        .build()).toList())
                .build()).toList();
    }

    public CourseDto getCourseById(Long id, Integer userId) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        boolean enrolled = false;
        for (User student : course.getStudentsEnrolled()) {
            if (student.getId().equals(userId)) {
                enrolled = true;
                break;
            }
        }
        if (!enrolled) {
            return CourseDto.builder()
                    .id(course.getId())
                    .courseName(course.getCourseName())
                    .courseDescription(course.getCourseDescription())
                    .instructor(userMapper.convertToDto(course.getInstructor()))
                    .whatYouWillLearn(course.getWhatYouWillLearn())
                    .categoryName(course.getCategory().getName())
                    .instructions(course.getInstructions() != null ?
                            new ArrayList<>(course.getInstructions()) : new ArrayList<>())
                    .price(course.getPrice())
                    .thumbnail(course.getThumbnail())
                    .rating(course.getRating() != null ?
                            course.getRating().stream()
                                    .map(element -> modelMapper.map(element, RatingAndReviewDto.class))
                                    .toList() : new ArrayList<>())
                    .tag(course.getTag() != null ?
                            new ArrayList<>(course.getTag()) : new ArrayList<>())
                    .build();
        }
        return courseMapper.convertToDto(course);
    }

    public List<CourseDto> getCoursesByInstructorId(Integer instructorId) {
        User instructor = userRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));
        List<Course> courses = courseRepository.findByInstructorId(instructorId);
        return courses.stream().map(courseMapper::convertToDto).toList();
    }

    public CourseDto updateCourse(Long id, CourseDto courseDto, MultipartFile file, Integer instructorId) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        Category category = categoryRepository.findByName(courseDto.getCategoryName());
        User instructor = userRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));
        if (instructor.getRole().getName() != RoleEnum.INSTRUCTOR && instructor.getRole().getName() != RoleEnum.ADMIN) {
            throw new RuntimeException("Only instructors or admins can update courses");
        }
        String fileUrl = uploader.uploadFile(file);
        course.setCourseName(courseDto.getCourseName());
        course.setCourseDescription(courseDto.getCourseDescription());
        course.setThumbnail(fileUrl);
        course.setPrice(courseDto.getPrice());
        course.setTag(courseDto.getTag());
        course.setWhatYouWillLearn(courseDto.getWhatYouWillLearn());
        course.setInstructions(courseDto.getInstructions());
        course.setCategory(category);
        course.setUpdatedAt(new Date());
        List<Section> currentSections  =  sectionRepository.findAllByCourseId(course.getId());
        course.setSections(currentSections);
        return courseMapper.convertToDto(courseRepository.save(course));
    }

    public void deleteSectionFromCourse(Long courseId, Long sectionId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Find the section within the course
        Optional<Section> sectionOptional = course.getSections().stream()
                .filter(section -> section.getId().equals(sectionId))
                .findFirst();

        // If the section exists, remove it
        if (sectionOptional.isPresent()) {
            Section section = sectionOptional.get();

            // Remove the section from the course's sections list
            course.getSections().remove(section);

            // Optional: If bidirectional, remove the course reference from the section
            section.setCourse(null);

            // Save the course to persist the removal
            courseRepository.save(course);
        } else {
            throw new RuntimeException("Section not associated with this course");
        }
    }

    public void deleteCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Delete the sections associated with the course
        course.getSections().forEach(section -> sectionService.deleteSection(section.getId()));

        // Delete the thumbnail
        uploader.deleteFile(course.getThumbnail());
        // Delete the course
        courseRepository.delete(course);

    }
}
