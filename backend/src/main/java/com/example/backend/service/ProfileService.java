package com.example.backend.service;

import com.example.backend.dto.UserDto;
import com.example.backend.dto.profile.UpdateProfileDto;
import com.example.backend.dto.profile.UserDetailDto;
import com.example.backend.entity.Course;
import com.example.backend.entity.Profile;
import com.example.backend.entity.RoleEnum;
import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.ProfileRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.utils.constants.ImageDefault;
import com.example.backend.utils.types.CloudFileInfoType;
import com.example.backend.utils.types.GetAllInstructorsResponse;
import com.example.backend.utils.types.GetAllStudentResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
public class ProfileService {
    private final UserRepository _userRepository;
    private final ProfileRepository _profileRepository;
    private final UserMapper _userMapper;
    private final CourseRepository _courseRepository;
    private final StorageService _storageService;

    public ProfileService(UserRepository userRepository, ProfileRepository profileRepository, UserMapper userMapper, CourseRepository courseRepository,
                          StorageService storageService) {
        this._userRepository = userRepository;
        this._profileRepository = profileRepository;
        this._userMapper = userMapper;
        this._courseRepository = courseRepository;
        this._storageService = storageService;
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
        return _userMapper.convertToUserDetailDto(currentUser);
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
        List<UserDto> userDtos = _userMapper.convertToUserDtoList(users);
        GetAllStudentResponse response = new GetAllStudentResponse();
        response.setStudents(userDtos);
        response.setTotal(count);
        return response;
    }

    public GetAllInstructorsResponse getAllInstructors() {
        List<User> users = _userRepository.findByRoleName(RoleEnum.INSTRUCTOR);
        Integer count = users.size();
        List<UserDto> userDtos = _userMapper.convertToUserDtoList(users);
        GetAllInstructorsResponse response = new GetAllInstructorsResponse();
        response.setInstructors(userDtos);
        response.setTotal(count);
        return response;
    }
}
