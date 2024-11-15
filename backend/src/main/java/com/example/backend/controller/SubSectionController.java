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
@CrossOrigin("*")
public class SubSectionController {
    private final SubSectionService subSectionService;
    // ================ create new subsection ================
    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<SubSectionDto> createSubSection(@RequestPart SubSectionDto subSectionDto, @RequestParam("file") MultipartFile file, @RequestParam Long sectionId) {
        SubSectionDto newSubSection = subSectionService.createSubSection(subSectionDto, file, sectionId);
        return ResponseEntity.ok(newSubSection);
    }
    // ================ update subsection ================
    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<SubSectionDto> updateSubSection(@RequestBody SubSectionDto subSectionDto, @PathVariable Long id, @RequestParam Long sectionId) {
        SubSectionDto updatedSubSection = subSectionService.updateSubSection(subSectionDto, id, sectionId);
        return ResponseEntity.ok(updatedSubSection);
    }

    // ================ update video subsection ================
    @PutMapping("/update-video/{id}")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<SubSectionDto> updateVideoSubSection(@RequestParam("file") MultipartFile file, @PathVariable Long id, @RequestParam Long sectionId) {
        SubSectionDto updatedSubSection = subSectionService.updateVideoSubSection(file, id, sectionId);
        return ResponseEntity.ok(updatedSubSection);
    }
    // ================ delete subsection ================
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<String> deleteSubSection(@PathVariable Long id) {
        subSectionService.deleteSubSection(id);
        return ResponseEntity.ok("Subsection deleted successfully");
    }
}
