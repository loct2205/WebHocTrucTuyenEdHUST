package com.example.backend.service;

import com.example.backend.dto.SectionDto;
import com.example.backend.dto.UserDto;
import com.example.backend.dto.profile.CourseEnrolledDto;
import com.example.backend.dto.profile.UpdateProfileDto;
import com.example.backend.dto.profile.UserDetailDto;
import com.example.backend.entity.*;
import com.example.backend.mapper.CourseMapper;
import com.example.backend.mapper.SectionMapper;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.CourseProgressRepository;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.ProfileRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.utils.constants.ImageDefault;
import com.example.backend.utils.helpers.Duration;
import com.example.backend.utils.types.*;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProfileService {
    private final UserRepository _userRepository;
    private final ProfileRepository _profileRepository;
    private final UserMapper _userMapper;
    private final CourseRepository _courseRepository;
    private final StorageService _storageService;
    private final CourseProgressRepository _courseProgressRepository;
    private final CourseMapper _courseMapper;
    private final SectionMapper _sectionMapper;

    public ProfileService(UserRepository userRepository, ProfileRepository profileRepository, UserMapper userMapper, CourseRepository courseRepository,
                          StorageService storageService,
                          CourseProgressRepository courseProgressRepository,
                            CourseMapper courseMapper,
                            SectionMapper sectionMapper
    ) {
        this._userRepository = userRepository;
        this._profileRepository = profileRepository;
        this._userMapper = userMapper;
        this._courseRepository = courseRepository;
        this._storageService = storageService;
        this._courseProgressRepository = courseProgressRepository;
        this._courseMapper = courseMapper;
        this._sectionMapper = sectionMapper;
    }

    public UpdateProfileDto updateProfile(User currentUser, UpdateProfileDto dto) {
        User user = _userRepository.findById(currentUser.getId()).orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = user.getProfile();
        if (profile == null) {
            profile = new Profile();
        }
        profile.setGender(dto.getGender().toString());
        profile.setDob(dto.getDob());
        profile.setAbout(dto.getAbout());
        profile.setContactNumber(dto.getContactNumber());
        Profile newProfile = _profileRepository.save(profile);

        // Update user fields if present in dto
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setFullName(dto.getFirstName() + " " + dto.getLastName());
        if(user.getProfile() == null) {
            user.setProfile(newProfile);
        }
        _userRepository.save(user);

        return dto;
    }

    public UserDetailDto getUserDetail(User currentUser) {
        UserDetailDto userDetailDto = _userMapper.convertToUserDetailDto(currentUser);
        userDetailDto.setAccountType(String.valueOf(currentUser.getRole().getName()).toLowerCase());
        return userDetailDto;
    }

    public String deleteAccount(User currentUser) throws IOException {
        User user = _userRepository.findById(currentUser.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        List<Course> courseEnrolled = user.getCourses();
        for (Course course : courseEnrolled) {
            course.getStudentsEnrolled().remove(user);
            _courseRepository.save(course);
        }
        if(user.getImageKey() != null) {
            if(!user.getImageKey().equals(ImageDefault.DEFAULT_IMAGE_KEY)) {
                _storageService.deleteFile(user.getImageKey());
            }
        }
        _userRepository.delete(user);
        return "Account deleted successfully";
    }

    public String updateUserProfileImage(User currentUser, MultipartFile file) throws IOException {
        User user = _userRepository.findById(currentUser.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        if(user.getImageKey() != null) {
            if(!user.getImageKey().equals(ImageDefault.DEFAULT_IMAGE_KEY)) {
                _storageService.deleteFile(user.getImageKey());
            }
        }
        CloudFileInfoType imageInfo = _storageService.uploadFile(file);
        user.setImageKey(imageInfo.getKey());
        user.setImageUrl(imageInfo.getUrl());
        _userRepository.save(user);
        return "Image updated successfully";
    }

    public GetAllStudentResponse getAllStudents() {
        List<User> users = _userRepository.findByRoleName(RoleEnum.STUDENT);
        Integer count = users.size();
        List<UserSpecific> userDtos = _userMapper.convertToUserDtoList(users);
        GetAllStudentResponse response = new GetAllStudentResponse();
        response.setStudents(userDtos);
        response.setTotal(count);
        return response;
    }

    public GetAllInstructorsResponse getAllInstructors() {
        List<User> users = _userRepository.findByRoleName(RoleEnum.INSTRUCTOR);
        Integer count = users.size();
        List<UserSpecific> userDtos = _userMapper.convertToUserDtoList(users);
        GetAllInstructorsResponse response = new GetAllInstructorsResponse();
        response.setInstructors(userDtos);
        response.setTotal(count);
        return response;
    }

    public List<CourseEnrolledDto> getEnrolledCourse(Integer userId) {
        User currentUser = _userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        List<Course> courseEnrolled = currentUser.getCourses();
        List<CourseEnrolledDto> courseEnrolledDtos = new ArrayList<>();

        for (Course course : courseEnrolled) {
            int totalDurationInSeconds = 0;
            int subSectionLength = 0;
            List<SectionDto> sections = new ArrayList<>();
            for (Section section : course.getSections()) {
                totalDurationInSeconds += section.getSubSections().stream()
                        .mapToInt(subSection -> Duration.convertTimeToSeconds(subSection.getTimeDuration()))
                        .sum();
                subSectionLength += section.getSubSections().size();
                sections.add(_sectionMapper.convertToDto(section));
            }

            CourseEnrolledDto courseEnrolledDto = _courseMapper.convertToCourseEnrolledDtoList(course);
            courseEnrolledDto.setTotalDuration(Duration.convertSecondsToDuration(totalDurationInSeconds));
            courseEnrolledDto.setCourseContent(sections);

            Optional<CourseProgress> courseProgresses = _courseProgressRepository.getCourseProgressesByCourseIdAndUserId(course.getId(), currentUser.getId());
            int courseProgressCount = courseProgresses.map(courseProgress -> courseProgress.getCompletedVideos().size()).orElse(0);

            if (subSectionLength == 0) {
                courseEnrolledDto.setProgressPercentage(100);
            } else {
                double progressPercentage = (courseProgressCount * 100.0) / subSectionLength;
                courseEnrolledDto.setProgressPercentage(Math.round(progressPercentage * 100.0) / 100.0);
            }

            courseEnrolledDtos.add(courseEnrolledDto);
        }

        return courseEnrolledDtos;
    }

    public List<CourseDataWithStats> getInstructorDashboard(User instructor) {
        List<Course> courses = _courseRepository.findByInstructorId(instructor.getId());
        List<CourseDataWithStats> response = new ArrayList<CourseDataWithStats>();
        for (Course course : courses) {
            int totalStudents = course.getStudentsEnrolled().size();
            double totalRevenue = course.getPrice() * totalStudents;
            CourseDataWithStats courseDataWithStats = CourseDataWithStats.builder()
                    .id(course.getId())
                    .courseName(course.getCourseName())
                    .courseDescription(course.getCourseDescription())
                    .totalStudentsEnrolled(totalStudents)
                    .totalAmountGenerated(totalRevenue)
                    .build();
            response.add(courseDataWithStats);
        }
        return response;
    }
}
