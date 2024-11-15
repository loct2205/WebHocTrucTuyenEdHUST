package com.example.backend.service;

import com.example.backend.dto.profile.CourseEnrolledDto;
import com.example.backend.dto.progress.UpdateCourseProgressDto;
import com.example.backend.entity.*;
import com.example.backend.repository.CourseProgressRepository;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.SubSectionRepository;
import com.example.backend.utils.helpers.Duration;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CourseProgressService {
    private final CourseProgressRepository _courseProgressRepository;
    private final SubSectionRepository _subSectionRepository;
    private final CourseRepository _courseRepository;

    public CourseProgressService(CourseProgressRepository courseProgressRepository, SubSectionRepository subSectionRepository, CourseRepository courseRepository) {
        this._courseProgressRepository = courseProgressRepository;
        this._subSectionRepository = subSectionRepository;
        this._courseRepository = courseRepository;
    }

    public String updateCourseProgress(User currentUser, UpdateCourseProgressDto request) {
        SubSection subSection = _subSectionRepository.findById(request.getSubSectionId()).orElseThrow(() -> new RuntimeException("Subsection not found"));
        CourseProgress courseProgress = _courseProgressRepository.findByUserIdAndCourseId(currentUser.getId(), request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course progress not found"));
        if (courseProgress.getCompletedVideos().contains(subSection)) {
            throw new RuntimeException("Subsection already completed");
        }
        courseProgress.getCompletedVideos().add(subSection);
        _courseProgressRepository.save(courseProgress);
        return "Course progress updated successfully";
    }

    public Double getCourseProgress(User currentUser, Long courseId) {
        Course course = _courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
        int subSectionLength = 0;

        for (Section section : course.getSections()) {  // Error: Cannot resolve method 'getSections' in 'Course'
            subSectionLength += section.getSubSections().size();
        }
        CourseProgress courseProgress = _courseProgressRepository.findByUserIdAndCourseId(currentUser.getId(), courseId)
                .orElseThrow(() -> new RuntimeException("Course progress not found"));
        int courseProgressCount = courseProgress.getCompletedVideos().size();
        double progressPercentage = (courseProgressCount * 100.0) / subSectionLength;
        double multiplier = Math.pow(10, 2);
        progressPercentage = Math.round(progressPercentage * multiplier) / multiplier;

        return  progressPercentage;
    }
}
