package com.example.backend.util;


import com.google.cloud.storage.Blob;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
@Component
public class Uploader {
    public String uploadFile(MultipartFile file) {
        try {
            // Generate a unique file name
            String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
    
            // Upload file to Firebase Storage
            StorageClient.getInstance()
                    .bucket()
                    .create(fileName, file.getBytes(), file.getContentType());
    
            // Construct the public URL for the uploaded file
            String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8.toString());
            String bucketName = StorageClient.getInstance().bucket().getName();
    
            return String.format(
                    "https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media",
                    bucketName,
                    encodedFileName
            );
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
