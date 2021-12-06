package com.jamongjelly.bbs.dto.response;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UserIdentityAvailability {

    private Boolean available;

    public UserIdentityAvailability(Boolean available) {
        this.available = available;
    }

}
