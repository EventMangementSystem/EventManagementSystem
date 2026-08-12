package com.eventmanagement.service;

import java.util.List;

import com.eventmanagement.dtos.PaymentRequest;
import com.eventmanagement.dtos.PaymentResponse;

public interface PaymentService {

    PaymentResponse makePayment(PaymentRequest request);

    List<PaymentResponse> getMyPayments();

    PaymentResponse getPayment(Long paymentId);

}