package com.jamongjelly.bbs.dto.response;

import com.jamongjelly.bbs.domain.board.Post;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class UserPostResponse {

    private Long id;

    private String title;

    private LocalDateTime createdAt;

    private Integer viewCnt;

    private Integer likeCnt;

    private Integer replyCnt;

    private BoardResponse board;

    private UserPostResponse(Long id, String title, LocalDateTime createdAt, Integer viewCnt, Integer likeCnt,
                            Integer replyCnt, BoardResponse board) {
        this.id = id;
        this.title = title;
        this.createdAt = createdAt;
        this.viewCnt = viewCnt;
        this.likeCnt = likeCnt;
        this.replyCnt = replyCnt;
        this.board = board;
    }

    public static UserPostResponse of(Post post) {
        return new UserPostResponse(
                post.getId(),
                post.getTitle(),
                post.getCreatedAt(),
                post.getViewCnt(),
                post.getLikeCnt(),
                post.getReplyCnt(),
                BoardResponse.of(post.getBoard())
        );
    }
}
