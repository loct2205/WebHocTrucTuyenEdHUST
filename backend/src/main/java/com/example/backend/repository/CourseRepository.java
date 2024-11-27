package com.example.backend.repository;

import com.example.backend.entity.Course;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    @Query("SELECT c FROM Course c WHERE c.instructor.id = ?1")
    List<Course> findByInstructorId(Integer instructorId);
}