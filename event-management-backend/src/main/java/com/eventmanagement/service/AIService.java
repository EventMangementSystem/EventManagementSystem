package com.eventmanagement.service;

import com.eventmanagement.dtos.AIRecommendationResponse;

public interface AIService {

    String chat(String message);

    AIRecommendationResponse recommend(Long eventId);

}