package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
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

    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private User instructor;

    @Column(name = "what_you_will_learn")
    private String whatYouWillLearn;

    @Column(name = "price")
    private Double price;

    @Column(name = "thumbnail")
    private String thumbnail;

    @ManyToMany
    @JoinTable(name = "students_enrolled",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> studentsEnrolled;

    @OneToMany(mappedBy = "course")
    private List<RatingAndReview> rating;

    @OneToMany(mappedBy = "course")
    private List<Section> sections; // courseContent

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category; // category

    @ElementCollection
    @Column(name = "tag", nullable = false)
    private List<String> tag;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    public enum Status {
        DRAFT,
        PUBLISHED
    }
}