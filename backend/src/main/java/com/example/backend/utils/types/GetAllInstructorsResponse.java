package com.example.backend.utils.types;

import com.example.backend.dto.UserDto;
import lombok.Data;

import java.util.List;

@Data
public class GetAllInstructorsResponse {
    List<UserSpecific> instructors;
    Integer total;
}
