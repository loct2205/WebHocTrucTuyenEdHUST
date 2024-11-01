package com.example.backend.repository;

import com.example.backend.entity.CourseProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseProgressRepository extends JpaRepository<CourseProgress, Long> {
    Optional<CourseProgress> getCourseProgressesByCourseIdAndUserId(Long id, Integer id1);
}