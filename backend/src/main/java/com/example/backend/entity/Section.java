package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.ErrorResponse;

import java.util.List;

@Entity
@Data
@Table(name = "section")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "section_name")
    private String sectionName;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(mappedBy = "section")
    private List<SubSection> subSections;


}