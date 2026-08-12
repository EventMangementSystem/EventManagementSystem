package com.eventmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.eventmanagement.entities.Event;
import com.eventmanagement.entities.EventCategory;

public interface EventRepository extends JpaRepository<Event, Long>, JpaSpecificationExecutor<Event> {

    List<Event> findByCategory(EventCategory category);

    List<Event> findByCityIgnoreCase(String city);

    List<Event> findByTitleContainingIgnoreCase(String keyword);

    long count();
}