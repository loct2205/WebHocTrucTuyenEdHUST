package com.example.backend.service;

import com.example.backend.dto.SubSectionDto;
import com.example.backend.entity.Section;
import com.example.backend.entity.SubSection;
import com.example.backend.repository.SectionRepository;
import com.example.backend.repository.SubSectionRepository;
import com.example.backend.util.Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class SubSectionService {
    private final Uploader uploader;
    private final SectionRepository sectionRepository;
    private final SubSectionRepository subSectionRepository;
    private final SectionService sectionService;
    public SubSectionDto createSubSection(SubSectionDto subSectionDto, MultipartFile file, Long sectionId) {
        String url = uploader.uploadFile(file);
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        SubSection newSubsection = SubSection.builder()
                .title(subSectionDto.getTitle())
                .description(subSectionDto.getDescription())
                .videoUrl(url)
                .section(section)
                .build();

        subSectionRepository.save(newSubsection);
        subSectionDto.setId(newSubsection.getId());
        subSectionDto.setVideoUrl(url);
        // update section
        sectionService.updateSubsectionToSection(newSubsection.getId(), sectionId);

        return subSectionDto;
    }
}
