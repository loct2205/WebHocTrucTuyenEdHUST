package com.example.backend.repository;

import com.example.backend.entity.RatingAndReviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingAndReviewRepository extends JpaRepository<RatingAndReviews, Long> {
}
