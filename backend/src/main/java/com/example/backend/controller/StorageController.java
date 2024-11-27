package com.example.backend.controller;

import com.example.backend.service.StorageService;
import com.example.backend.utils.types.CloudFileInfoType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequestMapping("/storages")
@RestController
@CrossOrigin("*")
public class StorageController {
    private final StorageService _storageService;

    public StorageController(StorageService storageService) {
        this._storageService = storageService;
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CloudFileInfoType> upload(@RequestBody() MultipartFile file) throws IOException {
        try {
            CloudFileInfoType response = _storageService.uploadFile(file);
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> delete(@RequestParam("fileName") String fileName) {
        try {
            String response = _storageService.deleteFile(fileName);
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
