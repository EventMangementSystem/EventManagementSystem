package com.eventmanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eventmanagement.dtos.ApiResponse;
import com.eventmanagement.dtos.LoginRequest;
import com.eventmanagement.dtos.LoginResponse;
import com.eventmanagement.dtos.RegisterRequest;
import com.eventmanagement.service.UserService;
import com.eventmanagement.utils.SuccessResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(@Valid @RequestBody RegisterRequest request) {

        return ResponseEntity.ok(
        SuccessResponse.of(
                userService.register(request),
                null));

    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {

        LoginResponse response = userService.login(request);

        return ResponseEntity.ok(
                SuccessResponse.of(
                        "Login Successful",
                        response));

    }

}