package com.example.backend.service;

import com.example.backend.dto.CreateRatingDto;
import com.example.backend.entity.Course;
import com.example.backend.entity.RatingAndReview;
import com.example.backend.entity.User;
import com.example.backend.mapper.CourseMapper;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.RatingAndReviewRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.utils.types.RatingResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class RatingService {
    private final RatingAndReviewRepository _ratingAndReviewRepository;
    private final CourseRepository _courseRepository;
    private final UserRepository _userRepository;
    private final UserMapper _userMapper;
    private final CourseMapper _courseMapper;

    public RatingService(RatingAndReviewRepository ratingAndReviewRepository, CourseRepository courseRepository, UserRepository userRepository, UserMapper userMapper, CourseMapper courseMapper) {
        this._ratingAndReviewRepository = ratingAndReviewRepository;
        this._courseRepository = courseRepository;
        this._userRepository = userRepository;
        this._userMapper = userMapper;
        this._courseMapper = courseMapper;
    }

    public RatingResponse createRating(CreateRatingDto createRatingDto, Integer userId) {
        User user = _userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Course course = _courseRepository.findById(createRatingDto.getCourseId()).orElseThrow(() -> new RuntimeException("Course not found"));
        if(!course.getStudentsEnrolled().contains(user)) {
            throw new RuntimeException("User has not enrolled in this course");
        }
        Optional<RatingAndReview> ratingAndReview = _ratingAndReviewRepository.findByCourseAndUser(course, user);
        if(ratingAndReview.isPresent()) {
            throw new RuntimeException("User has already rated this course");
        }

        RatingAndReview newRating = new RatingAndReview();
        newRating.setRating(createRatingDto.getRating());
        newRating.setReview(createRatingDto.getReview());
        newRating.setCourse(course);
        newRating.setUser(user);
        RatingAndReview newReview = _ratingAndReviewRepository.save(newRating);

        if(course.getRating() == null) {
            course.setRating(new ArrayList<>());
        }
        course.getRating().add(newReview);
        _courseRepository.save(course);

        return RatingResponse.builder()
                .id(newReview.getId())
                .rating(newReview.getRating())
                .review(newReview.getReview())
                .user(_userMapper.convertToUserDetailDto(user))
                .course(_courseMapper.convertToDto(course))
                .build();
    }
}
