package com.example.backend.util;


import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Component
public class Uploader {
    public String uploadFile(MultipartFile file) {
        try {
            String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
            StorageClient.getInstance().bucket().create(fileName, file.getBytes(), file.getContentType());
            return String.format("https://storage.googleapis.com/%s/%s", StorageClient.getInstance().bucket().getName(), fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}