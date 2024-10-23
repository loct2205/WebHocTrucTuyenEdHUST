package com.example.backend.mapper;

import com.example.backend.dto.UserDto;
import com.example.backend.dto.profile.UserDetailDto;
import com.example.backend.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    @Autowired
    private ModelMapper modelMapper;

    public UserDto convertToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    public UserDetailDto convertToUserDetailDto(User user) {
        return modelMapper.map(user, UserDetailDto.class);
    }

    public User convertToEntity(UserDto userDTO) {
        return modelMapper.map(userDTO, User.class);
    }
}