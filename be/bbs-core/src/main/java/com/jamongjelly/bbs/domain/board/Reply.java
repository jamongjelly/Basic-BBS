package com.jamongjelly.bbs.domain.board;

import com.jamongjelly.bbs.domain.UserDateAudit;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "replies")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Reply extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String writer;

    @Column(nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;

    @Builder
    public Reply(String writer, String content) {
        this.writer = writer;
        this.content = content;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public void updateContent(String content) {
        this.content = content;
    }
}
