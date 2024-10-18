package com.example.backend.repository;

import com.example.backend.entity.OTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OTPRepository extends JpaRepository<OTP, Long> {
    Optional<OTP> findTopByEmailOrderByCreatedAtDesc(String email);
}
