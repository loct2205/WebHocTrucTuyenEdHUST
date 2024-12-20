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

import java.util.List;

@RequestMapping("/courses")
@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class CourseController {
    private final CourseService courseService;
    private final Uploader uploader;
    // ================ create new course ================

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<CourseDto> createCourse(@RequestPart CourseDto courseDto, @RequestParam("file") MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        CourseDto newCourse = courseService.createCourse(courseDto, file, currentUser.getId());
        return ResponseEntity.ok(newCourse);
    }

    // ================ get all courses ================
    @GetMapping()
    public ResponseEntity<List<CourseDto>> getAllCoursesPreview() {
        List<CourseDto> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    // ================ get course by id ================
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CourseDto> getCourseDetail(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        CourseDto course = courseService.getCourseById(id, currentUser.getId());
        return ResponseEntity.ok(course);
    }

    // Get list of courses by instructor id
    @GetMapping("/instructor/{instructorId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CourseDto>> getCoursesByInstructorId(@PathVariable Integer instructorId) {
        List<CourseDto> courses = courseService.getCoursesByInstructorId(instructorId);
        return ResponseEntity.ok(courses);
    }

    // ================ update course ================
    @PostMapping("edit/{id}")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<CourseDto> updateCourse(@PathVariable Long id, @RequestPart CourseDto courseDto,  @RequestParam(value = "file", required = false) MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        CourseDto updatedCourse = courseService.updateCourse(id, courseDto, file, currentUser.getId());
        return ResponseEntity.ok(updatedCourse);
    }
    // ================ update course status ================
    @PatchMapping("edit/done")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<String> publishCourse(@RequestParam("id") Long id, @RequestParam("isPublic") Boolean isPublic) {
        String response = courseService.publishCourse(id, isPublic);
        return ResponseEntity.ok(response);
    }
    // ================ delete course ================
    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok("Course deleted successfully.");
    }

}
