package com.jamongjelly.bbs.security.oauth2.user;

import com.jamongjelly.bbs.domain.user.Role;
import com.jamongjelly.bbs.domain.user.User;
import com.jamongjelly.bbs.domain.user.RoleName;
import lombok.Getter;
import lombok.ToString;

import java.util.Map;

@Getter
@ToString
public abstract class OAuth2UserInfo {
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public abstract String getId();

    public abstract String getName();

    public abstract String getEmail();

    public abstract String getProfileImgUrl();

    public User toEntity() {
        User user = User.builder()
                .email(this.getEmail())
                .nickname(this.getName())
                .imgUrl(this.getProfileImgUrl())
                .build();
        user.addUserRole(new Role(RoleName.ROLE_USER.getId(), RoleName.ROLE_USER));
        return user;
    }
}
