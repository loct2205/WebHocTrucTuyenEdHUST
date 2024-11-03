package com.example.backend.mapper;

import com.example.backend.dto.SectionDto;
import com.example.backend.dto.SubSectionDto;
import com.example.backend.entity.Course;
import com.example.backend.entity.Section;
import com.example.backend.entity.SubSection;
import com.example.backend.repository.CourseRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class SectionMapper {
    @Autowired
    private ModelMapper modelMapper;
    private final CourseRepository courseRepository;
    private final SubSectionMapper subSectionMapper;
    public SectionDto convertToDto(Section section) {
        SectionDto newSectionDto = new SectionDto().builder()
                .id(section.getId())
                .sectionName(section.getSectionName())
                .courseId(section.getCourse().getId())
                .subSections(section.getSubSections().stream()
                        .map(subSectionMapper::convertToDto)
                        .toList())
                .build();
        return newSectionDto;
    }
    public Section convertToEntity(SectionDto sectionDto) {
        Course course = courseRepository.findById(sectionDto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        Section section = new Section();
        section.setId(sectionDto.getId());
        section.setSectionName(sectionDto.getSectionName());
        section.setCourse(course);
        section.setSubSections(sectionDto.getSubSections().stream()
                .map(subSectionMapper::convertToEntity)
                .toList());
        return section;
    }
}
