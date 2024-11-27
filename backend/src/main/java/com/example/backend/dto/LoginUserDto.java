package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class LoginUserDto {
    private String email;

    private String password;

}
