package com.eventmanagement.specification;

import org.springframework.data.jpa.domain.Specification;

import com.eventmanagement.entities.Event;
import com.eventmanagement.entities.EventCategory;

public class EventSpecification {

    public static Specification<Event> filterEvents(
            String search,
            EventCategory category,
            String city,
            Double minPrice,
            Double maxPrice) {

        return (root, query, cb) -> {

            var predicate = cb.conjunction();

            if (search != null && !search.isBlank()) {
                predicate = cb.and(predicate,
                        cb.or(
                                cb.like(cb.lower(root.get("title")),
                                        "%" + search.toLowerCase() + "%"),
                                cb.like(cb.lower(root.get("description")),
                                        "%" + search.toLowerCase() + "%")));
            }

            if (category != null) {
                predicate = cb.and(predicate,
                        cb.equal(root.get("category"), category));
            }

            if (city != null && !city.isBlank()) {
                predicate = cb.and(predicate,
                        cb.equal(cb.lower(root.get("city")),
                                city.toLowerCase()));
            }

            if (minPrice != null) {
                predicate = cb.and(predicate,
                        cb.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null) {
                predicate = cb.and(predicate,
                        cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            return predicate;
        };
    }
}