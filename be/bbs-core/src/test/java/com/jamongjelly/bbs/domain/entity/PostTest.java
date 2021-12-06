package com.jamongjelly.bbs.domain.entity;

import com.jamongjelly.bbs.domain.board.Post;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class PostTest {

    @Test
    public void postEntityTest() {
        //given
        String title = "테스트 글 제목";
        String writer = "테스트 작성자";
        String content = "테스트 글 내용";

        //when 
        Post post = Post.builder()
                .title(title)
                .writer(writer)
                .content(content)
                .showReply(true)
                .build();

        //then
        assertThat(post.getTitle()).isEqualTo(title);
        assertThat(post.getWriter()).isEqualTo(writer);
        assertThat(post.getContent()).isEqualTo(content);
        assertThat(post.getShowReply()).isEqualTo(true);
    }

}