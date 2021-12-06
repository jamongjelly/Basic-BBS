package com.jamongjelly.bbs.dto.response;

import com.jamongjelly.bbs.domain.board.Post;
import com.jamongjelly.bbs.domain.user.User;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class PostDetailsResponse {

    private Long id;

    private String title;

    private String writer;

    private String avatar;

    private String content;

    private Boolean showReply;

    private Integer viewCnt;

    private Integer likeCnt;

    private Integer replyCnt;

    private LocalDateTime createdAt;

    private Long createdBy;

    private BoardResponse board;

    private SubjectResponse subject;

    private Boolean like;

    private PostDetailsResponse(Post post, User user) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.writer = post.getWriter();
        this.avatar = user.getImgUrl();
        this.content = post.getContent();
        this.showReply = post.getShowReply();
        this.viewCnt = post.getViewCnt();
        this.likeCnt = post.getLikeCnt();
        this.replyCnt = post.getReplyCnt();
        this.createdAt = post.getCreatedAt();
        this.createdBy = post.getCreatedBy();
        this.board = BoardResponse.of(post.getBoard());
        this.subject = SubjectResponse.of(post.getSubject());
    }

    private PostDetailsResponse(Post post, User user, Boolean like) {
        this(post, user);
        this.like = like;
    }

    public static PostDetailsResponse of(Post post, User user) {
        return new PostDetailsResponse(post, user);
    }

    public static PostDetailsResponse of(Post post, User user, Boolean like) {
        return new PostDetailsResponse(post, user, like);
    }

}
