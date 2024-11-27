package com.example.backend.service;

import com.example.backend.utils.types.CloudFileInfoType;
import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class StorageService {
    private Storage storage;

    @EventListener
    public void init(ApplicationReadyEvent event) {
        try {
            ClassPathResource serviceAccount = new ClassPathResource("firebase.config.json");
            storage = StorageOptions.newBuilder().
                    setCredentials(GoogleCredentials.fromStream(serviceAccount.getInputStream())).
                    setProjectId("learn-edhust").build().getService();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    public CloudFileInfoType uploadFile(MultipartFile file) throws IOException{
        String imageName = generateFileName(file.getOriginalFilename());
        Map<String, String> map = new HashMap<>();
        map.put("firebaseStorageDownloadTokens", imageName);
        BlobId blobId = BlobId.of("learn-edhust.appspot.com", imageName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setMetadata(map)
                .setContentType(file.getContentType())
                .build();
        storage.create(blobInfo, file.getInputStream());
        // Generate public URL
        String fileUrl = "https://firebasestorage.googleapis.com/v0/b/" + blobId.getBucket() + "/o/"
                + URLEncoder.encode(blobId.getName(), StandardCharsets.UTF_8) + "?alt=media&token=" + imageName;

        return new CloudFileInfoType(imageName, fileUrl);
    }

    private String generateFileName(String originalFileName) {
        return UUID.randomUUID().toString() + "." + getExtension(originalFileName);
    }

    private String getExtension(String originalFileName) {
        return StringUtils.getFilenameExtension(originalFileName);
    }

    public String deleteFile(String fileName) throws IOException {
        BlobId blobId = BlobId.of("learn-edhust.appspot.com", fileName);
        boolean deleted = storage.delete(blobId);

        if (deleted) {
           return "File " + fileName + " deleted successfully.";
        } else {
            return "File " + fileName + " not found.";
        }
    }
}
