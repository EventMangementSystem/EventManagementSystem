package com.eventmanagement.serviceImpl;

import org.springframework.stereotype.Service;

import com.eventmanagement.dtos.DashboardResponse;
import com.eventmanagement.dtos.MonthlyRevenue;
import com.eventmanagement.repository.BookingRepository;
import com.eventmanagement.repository.UserRepository;
import com.eventmanagement.repository.EventRepository;
import com.eventmanagement.repository.PaymentRepository;
import com.eventmanagement.service.DashboardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final EventRepository eventRepository;

    private final BookingRepository bookingRepository;

    private final UserRepository userRepository;

    private final PaymentRepository paymentRepository;

    @Override
    public DashboardResponse getDashboard() {

        return new DashboardResponse(

            eventRepository.count(),

            bookingRepository.count(),

            userRepository.count(),

            paymentRepository.count(),

            paymentRepository.getTotalRevenue(),

            bookingRepository.getBookingStatus(),

            paymentRepository.getPaymentModes(),

            paymentRepository.getMonthlyRevenue()
            .stream()
            .map(row -> new MonthlyRevenue(
                    row[0].toString(),
                    ((Number) row[1]).doubleValue()
            ))
            .toList()

    );

    }

}