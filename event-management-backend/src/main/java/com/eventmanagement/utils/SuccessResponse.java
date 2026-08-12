package com.eventmanagement.utils;

import com.eventmanagement.dtos.ApiResponse;

public class SuccessResponse {

    public static <T> ApiResponse<T> of(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

}