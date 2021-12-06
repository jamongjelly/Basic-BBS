package com.jamongjelly.bbs.dto.response;

import lombok.Getter;

@Getter
public class JwtAuthResponse {

    private String accessToken;

    private UserSummary userSummary;

    public JwtAuthResponse(String accessToken, UserSummary userSummary) {
        this.accessToken = accessToken;
        this.userSummary = userSummary;
    }

}
