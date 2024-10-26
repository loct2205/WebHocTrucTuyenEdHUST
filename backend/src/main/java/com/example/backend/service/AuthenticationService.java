package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.entity.OTP;
import com.example.backend.entity.Role;
import com.example.backend.entity.RoleEnum;
import com.example.backend.entity.User;
import com.example.backend.model.MailRequest;
import com.example.backend.repository.OTPRepository;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.utils.constants.ImageDefault;
import jakarta.mail.MessagingException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.security.SecureRandom;
import java.util.Objects;
import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;

    private static final String CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int OTP_LENGTH = 6;
    private final SecureRandom random = new SecureRandom();
    private final TemplateEngine templateEngine;
    private final MailService mailService;
    private final OTPRepository otpRepository;
    private final JwtService jwtService;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder, RoleRepository roleRepository,
            TemplateEngine templateEngine,
            MailService mailService,
            OTPRepository otpRepository,
            JwtService jwtService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.templateEngine = templateEngine;
        this.mailService = mailService;
        this.otpRepository = otpRepository;
        this.jwtService = jwtService;
    }

    public User signup(RegisterUserDto input) {
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.STUDENT);


        if (optionalRole.isEmpty()) {
            return null;
        }
        if (!Objects.equals(input.getPassword(), input.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if (optionalUser.isPresent()) {
            throw new RuntimeException("User already exists");
        }
        String recentOtp = otpRepository.findTopByEmailOrderByCreatedAtDesc(input.getEmail())
                .orElseThrow(() -> new RuntimeException("OTP not found"))
                .getOtp();
        if (!recentOtp.equals(input.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }
        var user = new User();
        user.setFullName(input.getFirstName() + " " + input.getLastName());
        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setRole(optionalRole.get());
        user.setImageKey(ImageDefault.DEFAULT_IMAGE_KEY);
        user.setImageUrl(ImageDefault.DEFAULT_IMAGE_URL);

        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }

    public String sendOTP(SendOTPDto sendOTPDto) throws MessagingException {
        String email = sendOTPDto.getEmail();
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            String otp = generateOtp();
            String name = processEmail(email);
            // Get template mail
            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("otp", otp);
            String processedString = templateEngine.process("VerificationTemplate", context);
            MailRequest mailRequest = new MailRequest(email, "OTP Verification", processedString, true);
            mailService.sendMail(mailRequest);

            OTP otpEntity = new OTP();
            otpEntity.setEmail(email);
            otpEntity.setOtp(otp);
            otpRepository.save(otpEntity);
            return "Otp sent successfully";
        } else {
            throw new RuntimeException("User is Already Registered");
        }
    }

    private String generateOtp() {
        StringBuilder otp = new StringBuilder(OTP_LENGTH);
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return otp.toString();
    }

    private static String processEmail(String email) {
        String[] parts = email.split("@")[0].split("\\.");
        StringBuilder result = new StringBuilder();

        for (String part : parts) {
            result.append(part.replaceAll("\\d+", "")).append(" ");
        }

        return result.toString().trim();
    }

    public String changePassword(User currentUser, ChangePasswordDto changePasswordDto) throws MessagingException {
        if(!passwordEncoder.matches(changePasswordDto.getOldPassword(), currentUser.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }
        if(!Objects.equals(changePasswordDto.getNewPassword(), changePasswordDto.getConfirmPassword())) {
            throw new RuntimeException("The password and confirm password do not match");
        }
        currentUser.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        userRepository.save(currentUser);

        Context context = new Context();
        context.setVariable("name", currentUser.getFullName());
        context.setVariable("email", currentUser.getEmail());
        String processedString = templateEngine.process("PasswordUpdateTemplate", context);
        MailRequest mailRequest = new MailRequest(currentUser.getEmail(), "Password for your account has been updated", processedString, true);
        mailService.sendMail(mailRequest);

        return  "Password updated successfully";
    }
    
    public String resetPasswordToken(ResetPasswordTokenDto resetPasswordTokenDto) throws MessagingException {
        String email = resetPasswordTokenDto.getEmail();
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        String jwtToken = jwtService.generateToken(existingUser);
        String url = "http://localhost:3000/update-password/" + jwtToken;
        MailRequest mailRequest = new MailRequest(email, "Password Reset Link", "Password Reset Link: " + url, false);
        mailService.sendMail(mailRequest);
        return "Email sent successfully , Please check your mail box and change password";
    }

    public String resetPassword(User currentUser, ResetPasswordDto resetPasswordDto) {
        if(!Objects.equals(resetPasswordDto.getPassword(), resetPasswordDto.getConfirmPassword())) {
            throw new RuntimeException("The password and confirm password do not match");
        }
        currentUser.setPassword(passwordEncoder.encode(resetPasswordDto.getPassword()));
        userRepository.save(currentUser);
        return "Password reset successfully";
    }
}
