package com.eventmanagement.service;

import java.util.List;

import com.eventmanagement.dtos.BookingRequest;
import com.eventmanagement.dtos.BookingResponse;

public interface BookingService {

    BookingResponse bookTickets(BookingRequest request);

    List<BookingResponse> getMyBookings();

    BookingResponse cancelBooking(Long bookingId);

}