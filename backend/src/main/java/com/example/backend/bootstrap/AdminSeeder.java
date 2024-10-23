package com.example.backend.bootstrap;

import com.example.backend.dto.RegisterUserDto;
import com.example.backend.entity.*;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.utils.constants.ImageDefault;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AdminSeeder implements ApplicationListener<ContextRefreshedEvent> {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminSeeder(
            RoleRepository roleRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        this.createSuperAdministrator();
    }

    private void createSuperAdministrator() {
        RegisterUserDto userDto = new RegisterUserDto();
        userDto.setFirstName("Super");
        userDto.setLastName("Admin");
        userDto.setEmail("super.admin@email.com");
        userDto.setPassword("123456");

        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.ADMIN);
        Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());

        if (optionalRole.isEmpty() || optionalUser.isPresent()) {
            return;
        }

        var user = new User();
        user.setFullName(userDto.getFirstName() + " " + userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(optionalRole.get());
        user.setActive(true);
        user.setApprove(true);
        user.setImageKey(ImageDefault.DEFAULT_IMAGE_KEY);
        user.setImageUrl(ImageDefault.DEFAULT_IMAGE_URL);

        userRepository.save(user);
    }
}