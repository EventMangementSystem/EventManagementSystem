package com.eventmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AIEvent {

    private String title;

    private String description;

    private String category;

    private String city;

    private String venue;

    private Double price;

}