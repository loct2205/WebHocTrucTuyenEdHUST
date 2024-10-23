package com.example.backend.service;

import com.example.backend.dto.RegisterUserDto;
import com.example.backend.entity.Role;
import com.example.backend.entity.RoleEnum;
import com.example.backend.entity.User;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.utils.constants.ImageDefault;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }

    public User createInstructor(RegisterUserDto input) {
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.INSTRUCTOR);

        if (optionalRole.isEmpty()) {
            return null;
        }

        var user = new User();
        user.setFullName(input.getFirstName() + " " +  input.getLastName());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setRole(optionalRole.get());
        user.setImageKey(ImageDefault.DEFAULT_IMAGE_KEY);
        user.setImageUrl(ImageDefault.DEFAULT_IMAGE_URL);

        return userRepository.save(user);
    }
}