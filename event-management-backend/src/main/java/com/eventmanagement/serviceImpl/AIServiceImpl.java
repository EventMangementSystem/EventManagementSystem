package com.eventmanagement.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.eventmanagement.dtos.AIEvent;
import com.eventmanagement.dtos.AIRequest;
import com.eventmanagement.dtos.AIResponse;
import com.eventmanagement.entities.Event;
import com.eventmanagement.repository.EventRepository;
import com.eventmanagement.service.AIService;
import com.eventmanagement.custom_exceptions.ResourceNotFoundException;
import com.eventmanagement.dtos.AIRecommendationRequest;
import com.eventmanagement.dtos.AIRecommendationResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AIServiceImpl implements AIService {

    private final WebClient webClient;

    private final EventRepository eventRepository;

    @Value("${ai.service.url}")
    private String aiServiceUrl;

    @Value("${ai.recommend.url}")
    private String recommendUrl;

    @Override
    public String chat(String message) {

        List<AIEvent> events = eventRepository.findAll()
                .stream()
                .map(this::convertToAIEvent)
                .toList();

        AIRequest request = new AIRequest();

        request.setMessage(buildPrompt(message, events));

        AIResponse response = webClient.post()
                .uri(aiServiceUrl)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(AIResponse.class)
                .block();

        return response.getReply();
    }

    @Override
    public AIRecommendationResponse recommend(Long eventId) {

        Event currentEvent = eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Event not found"));

        List<AIEvent> availableEvents = eventRepository.findAll()
                .stream()
                .filter(event -> !event.getId().equals(eventId))
                .map(this::convertToAIEvent)
                .collect(Collectors.toList());

        AIRecommendationRequest request = new AIRecommendationRequest();

        request.setCurrentEvent(convertToAIEvent(currentEvent));
        request.setAvailableEvents(availableEvents);

        return webClient.post()
                .uri(recommendUrl)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(AIRecommendationResponse.class)
                .block();
    }

    private AIEvent convertToAIEvent(Event event) {

        return new AIEvent(
            event.getTitle(),
            event.getDescription(),
            event.getCategory().name(),
            event.getCity(),
            event.getVenue(),
            event.getPrice());
    }

    private String buildPrompt(String userMessage, List<AIEvent> events) {

    StringBuilder prompt = new StringBuilder();

    prompt.append("""
    You are an AI assistant for an Event Management System.

    IMPORTANT RULES:

    1. Answer ONLY using the events provided below.
    2. Never invent events.
    3. Never print raw fields like "Title:", "City:", or "Venue:".
    4. Respond in a natural, friendly way.
    5. Use bullet points.
    6. Mention why an event is recommended.
    7. If no event matches, politely say no matching event is available.

    Available Events:

    """);

        for (AIEvent event : events) {

            prompt.append(String.format(
                    "- %s | Category: %s | City: %s | Venue: %s | Price: ₹%.2f%n",
                    event.getTitle(),
                    event.getCategory(),
                    event.getCity(),
                    event.getVenue(),
                    event.getPrice()));
        }

        prompt.append("""

    User Question:
    """);

        prompt.append(userMessage);

        prompt.append("""

    Generate a friendly answer.
    """);

        return prompt.toString();
    }
}