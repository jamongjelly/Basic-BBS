package com.jamongjelly.bbs.dto.response;

import com.jamongjelly.bbs.domain.user.User;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UserSummary {

    private Long id;

    private String email;

    private String nickname;

    private String imgUrl;

    private String profileMsg;

    private String provider;

    private UserSummary(Long id, String email, String nickname, String imgUrl,
                        String profileMsg, String provider) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.imgUrl = imgUrl;
        this.profileMsg = profileMsg;
        this.provider = provider;
    }

    public static UserSummary of(User user) {
        return new UserSummary(user.getId(), user.getEmail(), user.getNickname(),
                user.getImgUrl(), user.getProfileMsg(), user.getProvider().name());
    }

}
