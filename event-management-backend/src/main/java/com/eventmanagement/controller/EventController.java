package com.eventmanagement.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import com.eventmanagement.dtos.ApiResponse;
import com.eventmanagement.dtos.EventRequest;
import com.eventmanagement.dtos.EventResponse;
import com.eventmanagement.entities.EventCategory;
import com.eventmanagement.service.EventService;
import com.eventmanagement.utils.SuccessResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createEvent(@Valid @RequestBody EventRequest request) {

        return ResponseEntity.ok(
                SuccessResponse.of(
                        eventService.createEvent(request),
                        null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<EventResponse>>> getAllEvents() {

        return ResponseEntity.ok(
                SuccessResponse.of(
                        "Events Retrieved Successfully",
                        eventService.getAllEvents()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EventResponse>> getEventById(@PathVariable Long id) {

        return ResponseEntity.ok(
                SuccessResponse.of(
                        "Event Retrieved Successfully",
                        eventService.getEventById(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> updateEvent(
            @PathVariable Long id,
            @Valid @RequestBody EventRequest request) {

        return ResponseEntity.ok(
                SuccessResponse.of(
                        eventService.updateEvent(id, request),
                        null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEvent(@PathVariable Long id) {

        return ResponseEntity.ok(
                SuccessResponse.of(
                        eventService.deleteEvent(id),
                        null));
    }

    @GetMapping("/search")
        public ResponseEntity<ApiResponse<Page<EventResponse>>> searchEvents(

                @RequestParam(required = false) String search,

                @RequestParam(required = false) EventCategory category,

                @RequestParam(required = false) String city,

                @RequestParam(required = false) Double minPrice,

                @RequestParam(required = false) Double maxPrice,

                @RequestParam(defaultValue = "0") int page,

                @RequestParam(defaultValue = "6") int size,

                @RequestParam(defaultValue = "eventDate") String sortBy,

                @RequestParam(defaultValue = "asc") String direction) {

        return ResponseEntity.ok(
                SuccessResponse.of(
                        "Events Retrieved Successfully",
                        eventService.searchEvents(
                                search,
                                category,
                                city,
                                minPrice,
                                maxPrice,
                                page,
                                size,
                                sortBy,
                                direction)));
        }
}