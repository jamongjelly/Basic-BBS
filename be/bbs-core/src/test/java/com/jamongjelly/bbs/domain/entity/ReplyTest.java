package com.jamongjelly.bbs.domain.entity;

import com.jamongjelly.bbs.domain.board.Reply;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ReplyTest {

    @Test
    public void replyEntityTest() {
        //given
        String writer = "댓글 작성자";
        String content = "댓글 내용";

        //when 
        Reply reply = Reply.builder()
                .writer(writer)
                .content(content)
                .build();

        //then
        assertThat(reply.getWriter()).isEqualTo(writer);
        assertThat(reply.getContent()).isEqualTo(content);
    }

}