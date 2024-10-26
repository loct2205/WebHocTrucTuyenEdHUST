package com.example.backend.controller;

import com.example.backend.dto.CourseDto;
import com.example.backend.entity.User;
import com.example.backend.service.CourseService;
import com.example.backend.util.Uploader;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/courses")
@RestController
@AllArgsConstructor
public class CourseController {
    private final CourseService courseService;
    private final Uploader uploader;
    // ================ create new course ================

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<CourseDto> createCourse(@RequestPart CourseDto courseDto, @RequestParam("file") MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        CourseDto newCourse = courseService.createCourse(courseDto, file, currentUser.getId().longValue());
        return ResponseEntity.ok(newCourse);
    }
}
