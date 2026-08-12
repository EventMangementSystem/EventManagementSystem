package com.eventmanagement.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.eventmanagement.custom_exceptions.ResourceNotFoundException;
import com.eventmanagement.dtos.EventRequest;
import com.eventmanagement.dtos.EventResponse;
import com.eventmanagement.entities.Event;
import com.eventmanagement.entities.EventCategory;
import com.eventmanagement.repository.EventRepository;
import com.eventmanagement.service.EventService;
import com.eventmanagement.specification.EventSpecification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final ModelMapper modelMapper;

    @Override
    public String createEvent(EventRequest request) {

        Event event = modelMapper.map(request, Event.class);

        event.setAvailableSeats(request.getTotalSeats());

        eventRepository.save(event);

        return "Event Created Successfully";
    }

    @Override
    public List<EventResponse> getAllEvents() {

        return eventRepository.findAll()
                .stream()
                .map(event -> modelMapper.map(event, EventResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public EventResponse getEventById(Long id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID : " + id));

        return modelMapper.map(event, EventResponse.class);
    }

    @Override
    public String updateEvent(Long id, EventRequest request) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID : " + id));

        modelMapper.map(request, event);

        // Keep available seats consistent when total seats are changed
        event.setAvailableSeats(request.getTotalSeats());

        eventRepository.save(event);

        return "Event Updated Successfully";
    }

    @Override
    public String deleteEvent(Long id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID : " + id));

        eventRepository.delete(event);

        return "Event Deleted Successfully";
    }

    @Override
    public Page<EventResponse> searchEvents(
            String search,
            EventCategory category,
            String city,
            Double minPrice,
            Double maxPrice,
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return eventRepository.findAll(
                EventSpecification.filterEvents(
                        search,
                        category,
                        city,
                        minPrice,
                        maxPrice),
                pageable)
                .map(event -> modelMapper.map(event, EventResponse.class));
    }
}