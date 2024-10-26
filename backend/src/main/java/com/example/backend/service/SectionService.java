package com.example.backend.service;

import com.example.backend.dto.SectionDto;
import com.example.backend.entity.Course;
import com.example.backend.entity.Section;
import com.example.backend.entity.SubSection;
import com.example.backend.mapper.SectionMapper;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.SectionRepository;
import com.example.backend.repository.SubSectionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SectionService {
    private final SectionRepository sectionRepository;
    private final SubSectionRepository subSectionRepository;
    private final CourseRepository courseRepository;
    private final SectionMapper sectionMapper;
    private final CourseService courseService;
    // ================ create new section ================
    public SectionDto createSection(SectionDto sectionDto, Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        Section newSection = new Section().builder()
                .sectionName(sectionDto.getSectionName())
                .course(course)
                .build();

        sectionDto.setId(sectionRepository.save(newSection).getId());
        sectionDto.setCourseId(courseId);
        // Update course
        courseService.updateSectionToCourse(courseId, newSection.getId());
        return sectionDto;
    }

    public void updateSubsectionToSection(Long subSectionId, Long sectionId) {
        SubSection subSection = subSectionRepository.findById(subSectionId)
                .orElseThrow(() -> new RuntimeException("Subsection not found"));
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        section.getSubSections().add(subSection);
        sectionRepository.save(section);
    }
}
