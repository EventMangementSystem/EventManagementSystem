package com.eventmanagement.dtos;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AIRecommendationRequest {

    private AIEvent currentEvent;

    private List<AIEvent> availableEvents;

}