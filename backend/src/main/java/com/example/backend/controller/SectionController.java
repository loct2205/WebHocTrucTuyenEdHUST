package com.example.backend.controller;

import com.example.backend.dto.SectionDto;
import com.example.backend.entity.Section;
import com.example.backend.service.SectionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/sections")
@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class SectionController {
    private final SectionService sectionService;
    // ================ create new section ================\
    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<SectionDto> createSection(@RequestBody SectionDto sectionDto, @RequestParam Long courseId) {
        SectionDto newSection = sectionService.createSection(sectionDto, courseId);
        return ResponseEntity.ok(newSection);
    }
    // ================ update section ================
    @PatchMapping("/update-name/{id}")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<String> updateSectionName(@RequestParam String newName, @PathVariable Long id) {
        String response = sectionService.updateSectionName(newName, id);
        return ResponseEntity.ok(response);
    }

    // ================ delete section ================
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<String> deleteSection(@PathVariable Long id) {
        sectionService.deleteSection(id);
        return ResponseEntity.ok("Section deleted successfully");
    }
}
