package com.example.backend.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class ResetPasswordTokenDto {
    @NotEmpty
    private String email;
}
