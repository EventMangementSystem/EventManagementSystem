package com.eventmanagement.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eventmanagement.service.TicketService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @GetMapping("/{paymentId}")
    public ResponseEntity<byte[]> downloadTicket(
            @PathVariable Long paymentId) {

        byte[] pdf = ticketService.generateTicket(paymentId);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=EventTicket.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}