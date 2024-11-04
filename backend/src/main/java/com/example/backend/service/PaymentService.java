package com.example.backend.service;

import com.example.backend.dto.EnrollStudentDto;
import com.example.backend.entity.Course;
import com.example.backend.entity.CourseProgress;
import com.example.backend.entity.RoleEnum;
import com.example.backend.entity.User;
import com.example.backend.model.MailRequest;
import com.example.backend.repository.CourseProgressRepository;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.ArrayList;

@Service
public class PaymentService {
    private final CourseRepository _courseRepository;
    private final CourseProgressRepository _courseProgressRepository;
    private final UserRepository _userRepository;
    private final MailService _mailService;
    private final TemplateEngine _templateEngine;

    public PaymentService(CourseRepository courseRepository, CourseProgressRepository courseProgressRepository, UserRepository userRepository, MailService mailService, TemplateEngine templateEngine) {
        this._courseRepository = courseRepository;
        this._courseProgressRepository = courseProgressRepository;
        this._userRepository = userRepository;
        this._mailService = mailService;
        this._templateEngine = templateEngine;
    }

    public String enrollStudents(EnrollStudentDto enrollStudentDto, Integer userId) throws MessagingException {
        User user = _userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getRole().getName().equals(RoleEnum.STUDENT)) {
            throw new RuntimeException("Only students can enroll in courses");
        }
        for(Long courseId : enrollStudentDto.getCourseIds()) {
            Course course = _courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
            if(course.getStudentsEnrolled() == null) {
                course.setStudentsEnrolled(new ArrayList<>());
            }
            if(course.getStudentsEnrolled().contains(user)) {
                throw new RuntimeException("User already enrolled in course");
            }
            course.getStudentsEnrolled().add(user);
            _courseRepository.save(course);
            CourseProgress courseProgress = new CourseProgress();
            courseProgress.setUser(user);
            courseProgress.setCourse(course);
            CourseProgress progress = _courseProgressRepository.save(courseProgress);
            if(user.getCourses() == null) {
                user.setCourses(new ArrayList<>());
                user.setCourseProgress(new ArrayList<>());
            }
            user.getCourses().add(course);
            user.getCourseProgress().add(progress);
            _userRepository.save(user);

            Context context = new Context();
            context.setVariable("name", user.getFullName());
            context.setVariable("courseName", course.getCourseName());
            String processedString = _templateEngine.process("CourseEnrollmentEmail", context);
            MailRequest mailRequest = new MailRequest(user.getEmail(), "Successfully Enrolled into " + course.getCourseName(), processedString, true);
            _mailService.sendMail(mailRequest);
        }

        return "Enrolled successfully";
    }
}
