package com.eventmanagement.serviceImpl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eventmanagement.custom_exceptions.DuplicateResourceException;
import com.eventmanagement.custom_exceptions.ResourceNotFoundException;
import com.eventmanagement.custom_exceptions.UnauthorizedException;
import com.eventmanagement.dtos.PaymentRequest;
import com.eventmanagement.dtos.PaymentResponse;
import com.eventmanagement.entities.Booking;
import com.eventmanagement.entities.BookingStatus;
import com.eventmanagement.entities.Payment;
import com.eventmanagement.entities.PaymentStatus;
import com.eventmanagement.entities.User;
import com.eventmanagement.repository.BookingRepository;
import com.eventmanagement.repository.PaymentRepository;
import com.eventmanagement.repository.UserRepository;
import com.eventmanagement.service.PaymentService;
import com.eventmanagement.service.MailService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final MailService mailService;

    @Override
    public PaymentResponse makePayment(PaymentRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User customer = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Booking not found"));

        if (!booking.getCustomer().getId().equals(customer.getId())) {
            throw new UnauthorizedException("You can only pay for your own booking");
        }

        paymentRepository.findByBookingId(booking.getId())
                .ifPresent(payment -> {
                    throw new DuplicateResourceException(
                            "Payment already completed for this booking");
                });

        Payment payment = new Payment();

        payment.setBooking(booking);
        payment.setAmount(booking.getTotalAmount());
        payment.setPaymentMode(request.getPaymentMode());
        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        payment.setTransactionId(UUID.randomUUID().toString());

        Payment saved = paymentRepository.save(payment);
        booking.setStatus(BookingStatus.PAID);
        bookingRepository.save(booking);

        mailService.sendEmail(
        customer.getEmail(),
        "Payment Successful",
        """
        Hello %s,

        Your payment was successful.

        Event : %s

        Amount : ₹%.2f

        Transaction ID :

        %s

        Thank you for your payment.

        Regards,
        Event Management Team
        """.formatted(
                customer.getName(),
                booking.getEvent().getTitle(),
                payment.getAmount(),
                payment.getTransactionId()));

        return convertToResponse(saved);
    }

    @Override
    public List<PaymentResponse> getMyPayments() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User customer = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return paymentRepository
                .findByBookingCustomerId(customer.getId())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public PaymentResponse getPayment(Long paymentId) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User customer = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment not found"));

        if (!payment.getBooking().getCustomer().getId().equals(customer.getId())) {
            throw new UnauthorizedException("Access denied");
        }

        return convertToResponse(payment);
    }

    private PaymentResponse convertToResponse(Payment payment) {

        PaymentResponse response = new PaymentResponse();

        response.setPaymentId(payment.getId());
        response.setCustomerName(payment.getBooking().getCustomer().getName());
        response.setEventName(payment.getBooking().getEvent().getTitle());
        response.setAmount(payment.getAmount());
        response.setPaymentMode(payment.getPaymentMode());
        response.setPaymentStatus(payment.getPaymentStatus());
        response.setTransactionId(payment.getTransactionId());
        response.setPaymentDate(payment.getPaymentDate());

        return response;
    }
}