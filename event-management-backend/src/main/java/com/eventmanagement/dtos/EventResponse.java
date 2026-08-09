package com.eventmanagement.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import com.eventmanagement.entities.EventCategory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventResponse {

    private Long id;

    private String title;

    private String description;

    private EventCategory category;

    private String venue;

    private String city;

    private LocalDate eventDate;

    private LocalTime eventTime;

    private Double price;

    private Integer totalSeats;

    private Integer availableSeats;

}