package com.jamongjelly.bbs.domain.user;

import lombok.Getter;

@Getter
public enum UserStatus {
    UNREGISTER(0, "UNREGISTER")
    , REGISTER(1, "REGISTER")
    , PAUSED(2, "PAUSED")
    ;

    private final Integer code;
    private final String name;

    UserStatus(Integer code, String name) {
        this.code = code;
        this.name = name;
    }
}
