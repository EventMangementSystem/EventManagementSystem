package com.eventmanagement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eventmanagement.dtos.ApiResponse;
import com.eventmanagement.dtos.PaymentRequest;
import com.eventmanagement.dtos.PaymentResponse;
import com.eventmanagement.service.PaymentService;
import com.eventmanagement.utils.SuccessResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<ApiResponse<PaymentResponse>> makePayment(
            @Valid @RequestBody PaymentRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(SuccessResponse.of(
                        "Payment successful",
                        paymentService.makePayment(request)));
    }

    @GetMapping("/my-payments")
    public ResponseEntity<ApiResponse<List<PaymentResponse>>> getMyPayments() {

        return ResponseEntity.ok(
                SuccessResponse.of(
                        "Payments fetched successfully",
                        paymentService.getMyPayments()));
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPayment(
            @PathVariable Long paymentId) {

        return ResponseEntity.ok(
                SuccessResponse.of(
                        "Payment fetched successfully",
                        paymentService.getPayment(paymentId)));
    }
}