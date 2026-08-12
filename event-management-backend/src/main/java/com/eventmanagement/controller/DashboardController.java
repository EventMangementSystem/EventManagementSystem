package com.eventmanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventmanagement.dtos.ApiResponse;
import com.eventmanagement.dtos.DashboardResponse;
import com.eventmanagement.service.DashboardService;
import com.eventmanagement.utils.SuccessResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboard() {

        return ResponseEntity.ok(

                SuccessResponse.of(

                        "Dashboard Loaded",

                        dashboardService.getDashboard()

                )

        );

    }

}