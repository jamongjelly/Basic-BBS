package com.jamongjelly.bbs.domain.board;

import com.jamongjelly.bbs.domain.UserDateAudit;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
@Getter
@ToString(exclude = { "replies", "attachments" })
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String writer;

    @Lob
    @Column(nullable = false)
    private String content;

    private Integer viewCnt = 0;

    private Integer likeCnt = 0;

    private Integer replyCnt = 0;

    private Boolean showReply = true;

    @ManyToOne(fetch = FetchType.LAZY)
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    private Subject subject;

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Reply> replies = new ArrayList<>();

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Attachment> attachments = new ArrayList<>();

    @Builder
    public Post(String title, String writer, String content, Boolean showReply) {
        this.title = title;
        this.writer = writer;
        this.content = content;
        this.showReply = showReply;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public void updatePost(String title, String content, Boolean showReply) {
        this.title = title;
        this.content = content;
        this.showReply = showReply;
    }

    public void increaseViewCnt() {
        viewCnt++;
    }

    public void increaseLikeCnt() {
        likeCnt++;
    }

    public void decreaseLikeCnt() {
        if (likeCnt == 0) {
            throw new RuntimeException("Cannot Decrease Like Count");
        }
        likeCnt--;
    }

    public void increaseReplyCnt() {
        replyCnt++;
    }

    public void decreaseReplyCnt() {
        if (replyCnt == 0) {
            throw new RuntimeException("Cannot Decrease Reply Count");
        }
        replyCnt--;
    }
}
