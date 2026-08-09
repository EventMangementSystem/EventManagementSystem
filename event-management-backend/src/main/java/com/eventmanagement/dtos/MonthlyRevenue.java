package com.eventmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MonthlyRevenue {

    private String month;

    private Double revenue;

}