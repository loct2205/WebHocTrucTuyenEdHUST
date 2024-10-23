package com.example.backend.service;

import com.example.backend.dto.UserDto;
import com.example.backend.dto.profile.UpdateProfileDto;
import com.example.backend.entity.Profile;
import com.example.backend.entity.User;
import com.example.backend.repository.ProfileRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProfileService {
    private final UserRepository _userRepository;
    private final ProfileRepository _profileRepository;

    public ProfileService(UserRepository userRepository, ProfileRepository profileRepository) {
        this._userRepository = userRepository;
        this._profileRepository = profileRepository;
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
        user.setFullName(dto.getFirstName() + dto.getLastName());
        if(user.getProfile() == null) {
            user.setProfile(newProfile);
        }
        _userRepository.save(user);

        return dto;
    }
}
