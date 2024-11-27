package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "course_progress")
public class CourseProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToMany
    @JoinTable(name = "completed_videos",
            joinColumns = @JoinColumn(name = "progress_id"),
            inverseJoinColumns = @JoinColumn(name = "sub_section_id"))
    @JsonManagedReference
    private List<SubSection> completedVideos;
}
