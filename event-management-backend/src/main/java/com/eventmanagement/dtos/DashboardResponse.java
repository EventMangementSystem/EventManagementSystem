package com.eventmanagement.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private long totalEvents;

    private long totalBookings;

    private long totalCustomers;

    private long totalPayments;

    private double totalRevenue;

    private List<ChartData> bookingStatus;

    private List<ChartData> paymentModes;

    private List<MonthlyRevenue> monthlyRevenue;

}