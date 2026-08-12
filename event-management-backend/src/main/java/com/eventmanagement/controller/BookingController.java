package com.eventmanagement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.eventmanagement.dtos.ApiResponse;
import com.eventmanagement.dtos.BookingRequest;
import com.eventmanagement.dtos.BookingResponse;
import com.eventmanagement.service.BookingService;
import com.eventmanagement.utils.SuccessResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
@Validated
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponse>> bookTickets(
            @Valid @RequestBody BookingRequest request) {

        BookingResponse response = bookingService.bookTickets(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(SuccessResponse.of("Ticket booked successfully", response));
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getMyBookings() {

        List<BookingResponse> response = bookingService.getMyBookings();

        return ResponseEntity.ok(
                SuccessResponse.of("Bookings fetched successfully", response));
    }

    @PutMapping("/cancel/{bookingId}")
    public ResponseEntity<ApiResponse<BookingResponse>> cancelBooking(
            @PathVariable Long bookingId) {

        BookingResponse response = bookingService.cancelBooking(bookingId);

        return ResponseEntity.ok(
                SuccessResponse.of("Booking cancelled successfully", response));
    }
}