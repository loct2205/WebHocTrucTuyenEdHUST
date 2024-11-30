package com.example.backend.repository;

import com.example.backend.entity.Course;
import com.example.backend.entity.RatingAndReview;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingAndReviewRepository extends JpaRepository<RatingAndReview, Long> {
    Optional<RatingAndReview> findByCourseAndUser(Course course, User user);
}
