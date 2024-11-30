package com.example.backend.utils.helpers;

import io.github.cdimascio.dotenv.Dotenv;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.probe.FFmpegProbeResult;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.helpers.DefaultHandler;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
@Component
public class Duration {
    @Value("${ffprobe.path}")
    private String ffprobePath;

    public static String convertSecondsToDuration(int totalSeconds) {
        int hours = totalSeconds / 3600;
        int minutes = (totalSeconds % 3600) / 60;
        int seconds = (totalSeconds % 3600) % 60;

        if (hours > 0) {
            return hours + "h " + minutes + "m";
        } else if (minutes > 0) {
            return minutes + "m " + seconds + "s";
        } else {
            return seconds + "s";
        }
    }
    public String extractVideoDuration(MultipartFile file) {


        try {
            // Save the MultipartFile to a temporary file
            File tempFile = File.createTempFile("uploaded", file.getOriginalFilename());
            try (FileOutputStream fos = new FileOutputStream(tempFile)) {
                fos.write(file.getBytes());
            }

            // Use FFprobe to get the duration
            FFprobe ffprobe = new FFprobe(ffprobePath);
            FFmpegProbeResult probeResult = ffprobe.probe(tempFile.getAbsolutePath());

            // Get duration in seconds
            double durationSeconds = probeResult.getFormat().duration;
            long durationMs = (long) (durationSeconds * 1000); // Convert to milliseconds

            // Delete the temporary file
            tempFile.delete();

            return formatDuration(durationMs);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return "00:00:00";
    }

    private String formatDuration(long durationMs) {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
        return sdf.format(new Date(durationMs));
    }

    public static int convertTimeToSeconds(String timeString) {
        if (timeString == null || !timeString.matches("\\d{2}:\\d{2}:\\d{2}")) {
            throw new IllegalArgumentException("Invalid time format, expected HH:mm:ss");
        }

        String[] parts = timeString.split(":");
        int hours = Integer.parseInt(parts[0]);
        int minutes = Integer.parseInt(parts[1]);
        int seconds = Integer.parseInt(parts[2]);

        // Convert to total seconds
        return hours * 3600 + minutes * 60 + seconds;
    }

    public static void main(String[] args) {
        int totalSeconds = 3665; // Example input
        System.out.println(convertSecondsToDuration(totalSeconds));
    }
}
