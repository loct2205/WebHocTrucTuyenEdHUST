package com.example.backend.mapper;

import com.example.backend.dto.CourseDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.Course;
import com.example.backend.dto.profile.UserDetailDto;
import com.example.backend.entity.User;
import com.example.backend.repository.CourseRepository;
import com.example.backend.utils.types.UserSpecific;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserMapper {
    @Autowired
    private ModelMapper modelMapper;

    private final CourseRepository courseRepository;

    // Convert User entity to UserDto
    public UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();

        userDto.setId(user.getId());
        userDto.setFullName(user.getFullName());
        userDto.setEmail(user.getEmail());
        userDto.setContactNumber(user.getContactNumber());
        userDto.setActive(user.getActive());
        userDto.setApprove(user.getApprove());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setUpdatedAt(user.getUpdatedAt());

        // Map courseEnrolled if not null
        userDto.setCourseEnrolled(user.getCourses() != null ?
                user.getCourses().stream()
                        .map(Course::getId)
                        .toList() : new ArrayList<>());

        // Map managedCourses if not null
        userDto.setManagedCourses(user.getManagedCourses() != null ?
                user.getManagedCourses().stream()
                        .map(Course::getId)
                        .toList() : new ArrayList<>());
        return userDto;
    }

    // Convert UserDto to User entity
    public User convertToEntity(UserDto userDto) {
        User user = new User();

        user.setId(userDto.getId());
        user.setFullName(userDto.getFullName());
        user.setEmail(userDto.getEmail());
        user.setContactNumber(userDto.getContactNumber());
        user.setActive(userDto.getActive());
        user.setApprove(userDto.getApprove());
        user.setCreatedAt(userDto.getCreatedAt());
        user.setUpdatedAt(userDto.getUpdatedAt());

        // If courses exist in DTO, map them back to the User's courses field
        if (userDto.getCourseEnrolled() != null) {
            List<Course> courses = userDto.getCourseEnrolled().stream()
                    .map(courseId -> courseRepository.findById(courseId)
                            .orElseThrow(() -> new RuntimeException("Course not found")))
                    .toList();
            user.setCourses(courses);
        }
        // If managedCourses exist in DTO, map them back to the User's managedCourses field
        if (userDto.getManagedCourses() != null) {
            List<Course> managedCourses = userDto.getManagedCourses().stream()
                    .map(courseId -> courseRepository.findById(courseId)
                            .orElseThrow(() -> new RuntimeException("Course not found")))
                    .toList();
            user.setManagedCourses(managedCourses);
        }

        return user;
    }
    public UserDetailDto convertToUserDetailDto(User user) {
        return modelMapper.map(user, UserDetailDto.class);
    }


    public List<UserSpecific> convertToUserDtoList(List<User> users) {
        return users.stream().map(user -> {
            UserSpecific userSpecific = modelMapper.map(user, UserSpecific.class);
            if (user.getCourses() != null) {
                List<CourseDto> courseDtos = user.getCourses().stream()
                        .map(course -> modelMapper.map(course, CourseDto.class))
                        .collect(Collectors.toList());
                userSpecific.setCourses(courseDtos);
            }
            if (user.getManagedCourses() != null) {
                List<CourseDto> managedCourseDtos = user.getManagedCourses().stream()
                        .map(course -> modelMapper.map(course, CourseDto.class))
                        .collect(Collectors.toList());
                userSpecific.setManagedCourses(managedCourseDtos);
            }
            return userSpecific;
        }).collect(Collectors.toList());
    }

}
