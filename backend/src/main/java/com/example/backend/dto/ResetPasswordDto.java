package com.example.backend.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class ResetPasswordDto {
    @NotEmpty
    private String password;

    @NotEmpty
    private String confirmPassword;
}
