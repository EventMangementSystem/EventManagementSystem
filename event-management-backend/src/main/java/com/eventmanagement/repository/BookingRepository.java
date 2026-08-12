package com.eventmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eventmanagement.dtos.ChartData;
import com.eventmanagement.entities.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByCustomerId(Long customerId);

    List<Booking> findByEventId(Long eventId);

    long count();

    @Query("""
    SELECT new com.eventmanagement.dtos.ChartData(
    b.status,
    COUNT(b)
    )
    FROM Booking b
    GROUP BY b.status
    """)
    List<ChartData> getBookingStatus();
}