package com.example.backend.controller;

import com.example.backend.dto.SubSectionDto;
import com.example.backend.service.SubSectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/subsections")
@RequiredArgsConstructor
public class SubSectionController {
    private final SubSectionService subSectionService;
    // ================ create new subsection ================
    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<SubSectionDto> createSubSection(@RequestPart SubSectionDto subSectionDto, @RequestParam("file") MultipartFile file, @RequestParam Long sectionId) {
        SubSectionDto newSubSection = subSectionService.createSubSection(subSectionDto, file, sectionId);
        return ResponseEntity.ok(newSubSection);
    }
}
