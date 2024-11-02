package com.example.backend.service;

import com.example.backend.dto.SubSectionDto;
import com.example.backend.entity.Section;
import com.example.backend.entity.SubSection;
import com.example.backend.repository.SectionRepository;
import com.example.backend.repository.SubSectionRepository;
import com.example.backend.util.Uploader;
import com.example.backend.utils.helpers.Duration;
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
    private final Duration duration;
    public SubSectionDto createSubSection(SubSectionDto subSectionDto, MultipartFile file, Long sectionId) {
        String url = uploader.uploadFile(file);
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        String timeDuration = duration.extractVideoDuration(file);
        SubSection newSubsection = SubSection.builder()
                .title(subSectionDto.getTitle())
                .description(subSectionDto.getDescription())
                .videoUrl(url)
                .section(section)
                .timeDuration(timeDuration)
                .build();

        subSectionRepository.save(newSubsection);
        subSectionDto.setId(newSubsection.getId());
        subSectionDto.setVideoUrl(url);
        subSectionDto.setSectionId(sectionId);
        subSectionDto.setTimeDuration(timeDuration);
        // update section
        sectionService.addSubsectionToSection(newSubsection.getId(), sectionId);

        return subSectionDto;
    }

    public SubSectionDto updateSubSection(SubSectionDto subSectionDto, Long subsectionId, Long sectionId) {
        SubSection subSection = subSectionRepository.findById(subsectionId)
                .orElseThrow(() -> new RuntimeException("Subsection not found"));
        subSection.setTitle(subSectionDto.getTitle());
        subSection.setDescription(subSectionDto.getDescription());
        // update section
        sectionService.updateSubsectionOnSection(subsectionId, sectionId);
        subSectionRepository.save(subSection);

        // Convert to DTO
        String timeDuration = subSection.getTimeDuration();
        subSectionDto.setTimeDuration(timeDuration);
        subSectionDto.setId(subSection.getId());
        subSectionDto.setVideoUrl(subSection.getVideoUrl());
        subSectionDto.setTimeDuration(subSection.getTimeDuration());
        subSectionDto.setSectionId(sectionId);
        return subSectionDto;
    }

    public SubSectionDto updateVideoSubSection(MultipartFile file, Long id, Long sectionId) {
        SubSection subSection = subSectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subsection not found"));
        // delete the old video
        uploader.deleteFile(subSection.getVideoUrl());
        String url = uploader.uploadFile(file);
        String timeDuration = duration.extractVideoDuration(file);
        subSection.setVideoUrl(url);
        subSection.setTimeDuration(timeDuration);
        subSectionRepository.save(subSection);
        // Update section
        sectionService.updateSubsectionOnSection(id, sectionId);

        // Convert to DTO
        SubSectionDto subSectionDto = new SubSectionDto();
        subSectionDto.setId(subSection.getId());
        subSectionDto.setTitle(subSection.getTitle());
        subSectionDto.setDescription(subSection.getDescription());
        subSectionDto.setVideoUrl(url);
        subSectionDto.setTimeDuration(timeDuration);
        subSectionDto.setSectionId(sectionId);
        return subSectionDto;
    }

    public void deleteSubSection(Long id) {
        SubSection subSection = subSectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subsection not found"));
        // delete the video
        uploader.deleteFile(subSection.getVideoUrl());

        // Delete subsection from section
        sectionService.deleteSubSectionOnSection(id, subSection.getSection().getId());
        subSectionRepository.delete(subSection);
    }
}
