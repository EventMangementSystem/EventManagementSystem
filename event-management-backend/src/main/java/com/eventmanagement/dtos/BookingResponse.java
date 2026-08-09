package com.eventmanagement.dtos;

import java.time.LocalDateTime;

import com.eventmanagement.entities.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {

    private Long bookingId;

    private String customerName;

    private String eventName;

    private Integer numberOfTickets;

    private Double totalAmount;

    private BookingStatus status;

    private LocalDateTime bookingDate;

    private String paymentStatus;

}