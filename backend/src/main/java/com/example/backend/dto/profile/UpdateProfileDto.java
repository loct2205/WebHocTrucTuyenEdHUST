package com.example.backend.dto.profile;

import com.example.backend.utils.enums.GenderEnum;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Null;
import lombok.Data;

@Data
public class UpdateProfileDto {
    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

    private GenderEnum gender;

    private String dob; // date of birth

    private String about;

    private String contactNumber;
}
