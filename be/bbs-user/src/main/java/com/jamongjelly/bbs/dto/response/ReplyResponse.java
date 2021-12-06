package com.jamongjelly.bbs.dto.response;

import com.jamongjelly.bbs.domain.board.Reply;
import com.jamongjelly.bbs.domain.user.User;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class ReplyResponse {

    private Long id;

    private String writer;

    private String avatar;

    private String content;

    private LocalDateTime createdAt;

    private Long createdBy;

    private ReplyResponse(Reply reply, User user) {
        this.id = reply.getId();
        this.writer = reply.getWriter();
        this.avatar = user.getImgUrl();
        this.content = reply.getContent();
        this.createdAt = reply.getCreatedAt();
        this.createdBy = reply.getCreatedBy();
    }

    public static ReplyResponse of(Reply reply, User user) {
        return new ReplyResponse(reply, user);
    }
}
