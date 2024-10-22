package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "profile")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "gender")
    private String gender;

    @Column(name = "dob")
    private String dob; // date of birth

    @Column(name = "about")
    private String about;

    @Column(name = "contact_number")
    private String contactNumber;

    @OneToOne(mappedBy = "profile")
    private User user;
}