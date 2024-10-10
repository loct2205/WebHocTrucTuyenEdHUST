package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class RegisterUserDto {
    private String email;

    private String password;

    private String fullName;

}
