package com.jamongjelly.bbs.dto.response;

import com.jamongjelly.bbs.domain.board.Post;
import com.jamongjelly.bbs.domain.user.User;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class PostListItemResponse {

    private Long id;

    private String title;

    private String writer;

    private Integer viewCnt;

    private Integer likeCnt;

    private Integer replyCnt;

    private LocalDateTime createdAt;

    private Long createdBy;

    private String avatar;

    private BoardResponse board;

    private SubjectResponse subject;

    private PostListItemResponse(Long id, String title, String writer, Integer viewCnt,
                                Integer likeCnt, Integer replyCnt, LocalDateTime createdAt, Long createdBy,
                                String avatar, BoardResponse board, SubjectResponse subject) {
        this.id = id;
        this.title = title;
        this.writer = writer;
        this.viewCnt = viewCnt;
        this.likeCnt = likeCnt;
        this.replyCnt = replyCnt;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.avatar = avatar;
        this.board = board;
        this.subject = subject;
    }

    public static PostListItemResponse of(Post post, User user) {
        return new PostListItemResponse(post.getId(),
                post.getTitle(),
                post.getWriter(),
                post.getViewCnt(),
                post.getLikeCnt(),
                post.getReplyCnt(),
                post.getCreatedAt(),
                post.getCreatedBy(),
                user.getImgUrl(),
                BoardResponse.of(post.getBoard()),
                SubjectResponse.of(post.getSubject()));
    }

}
