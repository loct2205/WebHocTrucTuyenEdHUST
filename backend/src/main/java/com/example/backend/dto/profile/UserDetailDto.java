package com.example.backend.dto.profile;

import com.example.backend.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailDto {
    private Integer id;
    private String fullName;
    private String lastName;
    private String firstName;
    private String email;
    private Profile profile;
}
