package com.jamongjelly.bbs.domain.board;

import com.jamongjelly.bbs.domain.DateAudit;
import com.jamongjelly.bbs.domain.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "post_likes")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostLike extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder
    public PostLike(Post post, User user) {
        this.post = post;
        this.user = user;
    }
}
