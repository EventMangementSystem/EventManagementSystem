package com.eventmanagement.dtos;

import com.eventmanagement.entities.PaymentMode;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {

    @NotNull(message = "Booking Id is required")
    private Long bookingId;

    @NotNull(message = "Payment mode is required")
    private PaymentMode paymentMode;

}