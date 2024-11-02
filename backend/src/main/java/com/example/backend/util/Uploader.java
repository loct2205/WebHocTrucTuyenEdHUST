package com.example.backend.util;


import com.google.cloud.storage.Blob;
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

    public void deleteFile(String fileUrl) {
        try {
            // Extract the file name from the URL
            String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);

            // Retrieve the file from the bucket
            Blob blob = StorageClient.getInstance().bucket().get(fileName);

            // Check if the file exists before attempting to delete
            if (blob != null && blob.exists()) {
                blob.delete();
                System.out.println("File deleted successfully.");
            } else {
                System.out.println("File not found in storage bucket.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Failed to delete file: " + fileUrl);
        }
    }

}