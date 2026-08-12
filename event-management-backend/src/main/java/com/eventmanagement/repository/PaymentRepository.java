package com.eventmanagement.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eventmanagement.dtos.ChartData;
import com.eventmanagement.entities.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByBookingId(Long bookingId);

    List<Payment> findByBookingCustomerId(Long customerId);

    @Query("""
    SELECT COALESCE(SUM(p.amount),0)
    FROM Payment p
    WHERE p.paymentStatus='SUCCESS'
    """)
    Double getTotalRevenue();

    long count();

    @Query("""
    SELECT new com.eventmanagement.dtos.ChartData(
    p.paymentMode,
    COUNT(p)
    )
    FROM Payment p
    GROUP BY p.paymentMode
    """)
    List<ChartData> getPaymentModes();

    @Query("""
    SELECT
    FUNCTION('DATE_FORMAT', p.paymentDate, '%b'),
    SUM(p.amount)
    FROM Payment p
    WHERE p.paymentStatus = 'SUCCESS'
    GROUP BY
    FUNCTION('MONTH', p.paymentDate),
    FUNCTION('DATE_FORMAT', p.paymentDate, '%b')
    ORDER BY
    FUNCTION('MONTH', p.paymentDate)
    """)
    List<Object[]> getMonthlyRevenue();
}