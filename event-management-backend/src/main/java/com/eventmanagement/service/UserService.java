package com.eventmanagement.service;

import com.eventmanagement.dtos.LoginRequest;
import com.eventmanagement.dtos.LoginResponse;
import com.eventmanagement.dtos.RegisterRequest;

public interface UserService {

    String register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

}