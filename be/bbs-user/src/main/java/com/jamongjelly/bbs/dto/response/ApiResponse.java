package com.jamongjelly.bbs.dto.response;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ApiResponse {

    private Boolean success;

    private String message;

    public ApiResponse(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }

}
