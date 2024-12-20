package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.entity.User;
import com.example.backend.model.LoginResponse;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.JwtService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
@CrossOrigin("*")
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        System.out.println("Registering user: " + registerUserDto.getFirstName() + " " + registerUserDto.getLastName());
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/send-otp")
    public ResponseEntity<String> register(@RequestBody SendOTPDto sendOTPDto) {
        try {
            String msg = authenticationService.sendOTP(sendOTPDto);
            return ResponseEntity.ok(msg);
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send OTP");
        }
    }

    @PostMapping("/change-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> changePassword(@Valid @RequestBody ChangePasswordDto changePasswordDto) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            String msg = authenticationService.changePassword(currentUser, changePasswordDto);
            return ResponseEntity.ok(msg);
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to change password");
        }
    }

    @PostMapping("/reset-password-token")
    public ResponseEntity<String> resetPasswordToken(@Valid @RequestBody ResetPasswordTokenDto resetPasswordTokenDto) {
        try {
            String msg = authenticationService.resetPasswordToken(resetPasswordTokenDto);
            return ResponseEntity.ok(msg);
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send reset password token");
        }
    }

    @PostMapping("/reset-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordDto resetPasswordDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        String msg = authenticationService.resetPassword(currentUser, resetPasswordDto);
        return ResponseEntity.ok(msg);
    }
}