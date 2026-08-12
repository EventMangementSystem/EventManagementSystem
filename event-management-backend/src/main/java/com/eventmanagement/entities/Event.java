package com.eventmanagement.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private EventCategory category;

    private String venue;

    private String city;

    private LocalDate eventDate;

    private LocalTime eventTime;

    private Double price;

    private Integer totalSeats;

    private Integer availableSeats;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();

}