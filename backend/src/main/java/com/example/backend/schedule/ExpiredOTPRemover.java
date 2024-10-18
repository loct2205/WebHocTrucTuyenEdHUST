package com.example.backend.schedule;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ExpiredOTPRemover {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    @Scheduled(fixedRate = 60000) // Run every minute
    public void removeExpiredEntities() {
        LocalDateTime threshold = LocalDateTime.now().minusMinutes(3);
        entityManager.createQuery("DELETE FROM OTP e WHERE e.createdAt < :threshold")
                .setParameter("threshold", threshold)
                .executeUpdate();
    }
}