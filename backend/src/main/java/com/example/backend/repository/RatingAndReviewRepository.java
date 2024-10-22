package com.example.backend.repository;

import com.example.backend.entity.RatingAndReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingAndReviewRepository extends JpaRepository<RatingAndReview, Long> {
}
