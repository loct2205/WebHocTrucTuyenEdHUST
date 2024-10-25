package com.example.backend.utils.types;

import com.example.backend.dto.UserDto;
import com.example.backend.entity.User;
import lombok.Data;

import java.util.List;

@Data
public class GetAllStudentResponse {
    List<UserDto> students;
    Integer total;
}
