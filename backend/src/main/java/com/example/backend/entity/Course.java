package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "course_name")
    private String courseName;

    @Column(name = "course_description")
    private String courseDescription;

    @Column(name = "instructor")
    private String instructor;

    @Column(name = "what_you_will_learn")
    private String whatYouWillLearn;

    @Column(name = "course_content")
    private String courseContent;

    @Column(name = "price")
    private Double price;

    @Column(name = "thumbnail")
    private String thumbnail;

    @ManyToMany
    @JoinTable(name = "students_enrolled",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> studentsEnrolled;

    @ManyToOne
    @JoinColumn(name = "rating_id")
    private RatingAndReviews rating;

    @OneToMany(mappedBy = "course")
    private List<Section> sections;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;
}