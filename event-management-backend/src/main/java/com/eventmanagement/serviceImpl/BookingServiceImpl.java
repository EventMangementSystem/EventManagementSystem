package com.eventmanagement.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.eventmanagement.custom_exceptions.ResourceNotFoundException;
import com.eventmanagement.custom_exceptions.UnauthorizedException;
import com.eventmanagement.dtos.BookingRequest;
import com.eventmanagement.dtos.BookingResponse;
import com.eventmanagement.entities.Booking;
import com.eventmanagement.entities.BookingStatus;
import com.eventmanagement.entities.Event;
import com.eventmanagement.entities.User;
import com.eventmanagement.repository.BookingRepository;
import com.eventmanagement.repository.EventRepository;
import com.eventmanagement.repository.UserRepository;
import com.eventmanagement.service.BookingService;
import com.eventmanagement.service.MailService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final MailService mailService;

    @Override
    public BookingResponse bookTickets(BookingRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User customer = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        if (event.getAvailableSeats() < request.getNumberOfTickets()) {
            throw new IllegalArgumentException("Not enough seats available");
        }

        Booking booking = new Booking();

        booking.setCustomer(customer);
        booking.setEvent(event);
        booking.setNumberOfTickets(request.getNumberOfTickets());

        double totalAmount = event.getPrice() * request.getNumberOfTickets();

        booking.setTotalAmount(totalAmount);
        booking.setStatus(BookingStatus.BOOKED);

        event.setAvailableSeats(
                event.getAvailableSeats() - request.getNumberOfTickets());

        eventRepository.save(event);

        Booking savedBooking = bookingRepository.save(booking);

        mailService.sendEmail(
        customer.getEmail(),
        "Booking Confirmation",
        """
        Hello %s,

        Your booking has been confirmed.

        Event : %s

        Tickets : %d

        Total Amount : ₹%.2f

        Booking ID : %d

        Thank you for booking with us.

        Regards,
        Event Management Team
        """.formatted(
                customer.getName(),
                event.getTitle(),
                booking.getNumberOfTickets(),
                booking.getTotalAmount(),
                savedBooking.getId()));

        return convertToResponse(savedBooking);
    }

    @Override
    public List<BookingResponse> getMyBookings() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User customer = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return bookingRepository.findByCustomerId(customer.getId())
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BookingResponse cancelBooking(Long bookingId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User customer = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (!booking.getCustomer().getId().equals(customer.getId())) {
            throw new UnauthorizedException("You are not authorized to cancel this booking");
        }

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new IllegalArgumentException("Booking is already cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);

        Event event = booking.getEvent();

        event.setAvailableSeats(
                event.getAvailableSeats() + booking.getNumberOfTickets());

        eventRepository.save(event);

        Booking updatedBooking = bookingRepository.save(booking);

        mailService.sendEmail(
        customer.getEmail(),
        "Booking Cancelled",
        """
        Hello %s,

        Your booking has been cancelled successfully.

        Event : %s

        Booking ID : %d

        We hope to see you again.

        Regards,
        Event Management Team
        """.formatted(
                customer.getName(),
                event.getTitle(),
                updatedBooking.getId()));

        return convertToResponse(updatedBooking);
    }

    private BookingResponse convertToResponse(Booking booking) {

        BookingResponse response = modelMapper.map(booking, BookingResponse.class);

        response.setBookingId(booking.getId());
        response.setCustomerName(booking.getCustomer().getName());
        response.setEventName(booking.getEvent().getTitle());

        return response;
    }

}