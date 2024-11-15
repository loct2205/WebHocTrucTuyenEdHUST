package com.example.backend.mapper;

import com.example.backend.dto.SubSectionDto;
import com.example.backend.entity.Section;
import com.example.backend.entity.SubSection;
import com.example.backend.repository.SectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SubSectionMapper {
    private final SectionRepository sectionRepository;
    public SubSectionDto convertToDto(SubSection subSection) {
        SubSectionDto newSubSectionDto = new SubSectionDto();
        newSubSectionDto.setId(subSection.getId());
        newSubSectionDto.setTitle(subSection.getTitle());
        newSubSectionDto.setDescription(subSection.getDescription());
        newSubSectionDto.setVideoUrl(subSection.getVideoUrl());
        newSubSectionDto.setTimeDuration(subSection.getTimeDuration());
        newSubSectionDto.setSectionId(subSection.getSection().getId());
        return newSubSectionDto;
    }
    public SubSection convertToEntity(SubSectionDto subSectionDto) {
        SubSection subSection = new SubSection();
        subSection.setId(subSectionDto.getId());
        subSection.setTitle(subSectionDto.getTitle());
        subSection.setDescription(subSectionDto.getDescription());
        subSection.setVideoUrl(subSectionDto.getVideoUrl());
        subSection.setTimeDuration(subSectionDto.getTimeDuration());
        Section section = sectionRepository.findById(subSectionDto.getSectionId())
                .orElseThrow(() -> new RuntimeException("Section not found"));
        subSection.setSection(section);
        return subSection;
    }
}
