package com.example.backend.dto;

import com.example.backend.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Integer id;
    private String fullName;
    private String lastName;
    private String firstName;
    private String email;
    private String contactNumber;
    private Boolean active;
    private Boolean approve;
    private Date createdAt;
    private Date updatedAt;
    private List<Long> courseEnrolled; // id
    private List<Long> managedCourses; // id
    private Profile profile;
    private String imageKey;
    private String imageUrl;

}
