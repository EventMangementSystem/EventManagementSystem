package com.eventmanagement.dtos;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AIRecommendationResponse {

    private List<Recommendation> recommendations;

    @Getter
    @Setter
    public static class Recommendation {

        private String title;

        private String reason;

    }

}