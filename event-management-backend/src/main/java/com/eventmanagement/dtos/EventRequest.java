package com.eventmanagement.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import com.eventmanagement.entities.EventCategory;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Category is required")
    private EventCategory category;

    @NotBlank(message = "Venue is required")
    private String venue;

    @NotBlank(message = "City is required")
    private String city;

    @NotNull(message = "Event Date is required")
    @Future(message = "Event Date must be in the future")
    private LocalDate eventDate;

    @NotNull(message = "Event Time is required")
    private LocalTime eventTime;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price cannot be negative")
    private Double price;

    @NotNull(message = "Total Seats are required")
    @Min(value = 1, message = "At least one seat is required")
    private Integer totalSeats;

}