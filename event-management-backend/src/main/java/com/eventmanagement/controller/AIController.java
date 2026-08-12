package com.eventmanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eventmanagement.dtos.AIRecommendationResponse;
import com.eventmanagement.dtos.AIRequest;
import com.eventmanagement.dtos.ApiResponse;
import com.eventmanagement.service.AIService;
import com.eventmanagement.utils.SuccessResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;

    @PostMapping("/chat")
    public ResponseEntity<ApiResponse<String>> chat(
            @RequestBody AIRequest request) {

        return ResponseEntity.ok(
                SuccessResponse.of(
                        "AI Response Generated Successfully",
                        aiService.chat(request.getMessage())
                )
        );
    }

    @PostMapping("/recommend/{eventId}")
    public ResponseEntity<ApiResponse<AIRecommendationResponse>> recommend(
            @PathVariable Long eventId) {

        return ResponseEntity.ok(
                SuccessResponse.of(
                        "Recommendations Generated Successfully",
                        aiService.recommend(eventId)
                )
        );
    }
}