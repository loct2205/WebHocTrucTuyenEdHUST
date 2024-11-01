package com.example.backend.utils.helpers;

public class Duration {
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

    public static void main(String[] args) {
        int totalSeconds = 3665; // Example input
        System.out.println(convertSecondsToDuration(totalSeconds));
    }
}
