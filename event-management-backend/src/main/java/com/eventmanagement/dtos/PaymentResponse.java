package com.eventmanagement.dtos;

import java.time.LocalDateTime;

import com.eventmanagement.entities.PaymentMode;
import com.eventmanagement.entities.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {

    private Long paymentId;

    private String customerName;

    private String eventName;

    private Double amount;

    private PaymentMode paymentMode;

    private PaymentStatus paymentStatus;

    private String transactionId;

    private LocalDateTime paymentDate;

}