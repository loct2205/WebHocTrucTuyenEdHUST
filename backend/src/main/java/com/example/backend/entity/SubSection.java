package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "sub_section")
@Data
public class SubSection {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "time_duration")
    private String timeDuration;

    @Column(name = "description")
    private String description;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "additional_url")
    private String additionalUrl;

    @ManyToOne
    @JoinColumn(name = "section_id")
    private Section section;
}