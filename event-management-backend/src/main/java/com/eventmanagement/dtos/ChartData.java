package com.eventmanagement.dtos;

import lombok.Getter;

@Getter
public class ChartData {

    private final String label;

    private final Long value;

    public ChartData(Object label, Long value) {
        this.label = label.toString();
        this.value = value;
    }
}