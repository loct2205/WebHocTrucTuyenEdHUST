package com.example.backend.utils.helpers;

import java.util.concurrent.ThreadLocalRandom;

public class Random {
    public static int getRandomInt(int max) {
        return ThreadLocalRandom.current().nextInt(max);
    }
}
