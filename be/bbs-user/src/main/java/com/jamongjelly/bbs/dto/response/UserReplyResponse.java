package com.jamongjelly.bbs.dto.response;

import com.jamongjelly.bbs.domain.board.Reply;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class UserReplyResponse {

    private Long id;

    private String content;

    private LocalDateTime createdAt;

    private Long postId;

    private String postTitle;

    private BoardResponse board;

    private UserReplyResponse(Long id, String content, LocalDateTime createdAt,
                             Long postId, String postTitle, BoardResponse board) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.postId = postId;
        this.postTitle = postTitle;
        this.board = board;
    }

    public static UserReplyResponse of(Reply reply) {
        return new UserReplyResponse(reply.getId(), reply.getContent(), reply.getCreatedAt(),
                reply.getPost().getId(), reply.getPost().getTitle(), BoardResponse.of(reply.getPost().getBoard()));
    }
}
