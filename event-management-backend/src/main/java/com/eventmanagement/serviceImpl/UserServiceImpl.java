package com.eventmanagement.serviceImpl;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.eventmanagement.custom_exceptions.DuplicateResourceException;
import com.eventmanagement.custom_exceptions.ResourceNotFoundException;
import com.eventmanagement.custom_exceptions.UnauthorizedException;
import com.eventmanagement.dtos.LoginRequest;
import com.eventmanagement.dtos.LoginResponse;
import com.eventmanagement.dtos.RegisterRequest;
import com.eventmanagement.entities.Role;
import com.eventmanagement.entities.User;
import com.eventmanagement.repository.UserRepository;
import com.eventmanagement.security.JwtUtils;
import com.eventmanagement.service.UserService;
import com.eventmanagement.service.MailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final ModelMapper modelMapper;
    private final MailService mailService;

    @Override
    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        User user = modelMapper.map(request, User.class);

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.CUSTOMER);

        userRepository.save(user);

        mailService.sendEmail(
        user.getEmail(),
        "Welcome to Event Management System",
        """
        Hello %s,

        Welcome to Event Management System.

        Your account has been created successfully.

        Happy Booking!

        Regards,
        Event Management Team
        """.formatted(user.getName()));

        return "User Registered Successfully";
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid password");
        }

        String token = jwtUtils.generateToken(user.getEmail());

        return new LoginResponse(token, user.getRole().name());
    }
}