package com.example.backend.service;

import com.example.backend.dto.SectionDto;
import com.example.backend.entity.Course;
import com.example.backend.entity.Section;
import com.example.backend.entity.SubSection;
import com.example.backend.mapper.SectionMapper;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.SectionRepository;
import com.example.backend.repository.SubSectionRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class SectionService {
    private final SectionRepository sectionRepository;
    private final SubSectionRepository subSectionRepository;
    private final CourseRepository courseRepository;
    private final SectionMapper sectionMapper;
    private final SubSectionService subSectionService;


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
        return sectionDto;
    }

    public void addSubsectionToSection(Long subSectionId, Long sectionId) {
        SubSection subSection = subSectionRepository.findById(subSectionId)
                .orElseThrow(() -> new RuntimeException("Subsection not found"));
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        section.getSubSections().add(subSection);
        sectionRepository.save(section);
    }

    public void updateSubsectionOnSection(Long subsectionId, Long sectionId) {
        SubSection newSubsection = subSectionRepository.findById(subsectionId)
                .orElseThrow(() -> new RuntimeException("Subsection not found"));
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));

        // Find the existing subsection within the section's subsections
        Optional<SubSection> currentSubSectionOptional = section.getSubSections().stream()
                .filter(s -> s.getId().equals(subsectionId))
                .findFirst();

        // If found, update its details; otherwise, throw an exception
        if (currentSubSectionOptional.isPresent()) {
            SubSection currentSubSection = currentSubSectionOptional.get();
            currentSubSection.setTitle(newSubsection.getTitle());
            currentSubSection.setDescription(newSubsection.getDescription());
            currentSubSection.setVideoUrl(newSubsection.getVideoUrl());
            currentSubSection.setAdditionalUrl(newSubsection.getAdditionalUrl());
            currentSubSection.setTimeDuration(newSubsection.getTimeDuration());

            // Save the updated section
            sectionRepository.save(section);
        } else {
            throw new RuntimeException("Subsection not associated with this section");
        }
    }
    public void deleteSubSectionOnSection(Long subSectionId, Long sectionId) {
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));

        // Find the subsection in the section's list
        Optional<SubSection> subSectionOptional = section.getSubSections().stream()
                .filter(s -> s.getId().equals(subSectionId))
                .findFirst();

        if (subSectionOptional.isPresent()) {
            SubSection subSection = subSectionOptional.get();

            // Remove the subsection from the section
            section.getSubSections().remove(subSection);

            // Optional: If bidirectional, remove section reference from subsection as well
            subSection.setSection(null);

            // Save the section to persist the removal
            sectionRepository.save(section);
        } else {
            throw new RuntimeException("Subsection not associated with this section");
        }
    }


    public String updateSectionName(String newName, Long id) {
        Section section = sectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        section.setSectionName(newName);
        sectionRepository.save(section);
        return "Section name updated successfully with name: " + newName;
    }

    public void deleteSection(Long id) {
        Section section = sectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        // Delete all subsections
        section.getSubSections().forEach(subSection -> subSectionService.deleteSubSection(subSection.getId()));
        // Delete the section
        sectionRepository.delete(section);

    }
}
