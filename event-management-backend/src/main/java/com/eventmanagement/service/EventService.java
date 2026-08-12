package com.eventmanagement.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.eventmanagement.dtos.EventRequest;
import com.eventmanagement.dtos.EventResponse;
import com.eventmanagement.entities.EventCategory;

public interface EventService {

    String createEvent(EventRequest request);

    List<EventResponse> getAllEvents();

    EventResponse getEventById(Long id);

    String updateEvent(Long id, EventRequest request);

    String deleteEvent(Long id);

    Page<EventResponse> searchEvents(
        String search,
        EventCategory category,
        String city,
        Double minPrice,
        Double maxPrice,
        int page,
        int size,
        String sortBy,
        String direction);

}