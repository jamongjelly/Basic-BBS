package com.jamongjelly.bbs.domain.entity;

import com.jamongjelly.bbs.domain.board.Board;
import org.junit.Test;

import static org.junit.Assert.assertSame;

public class BoardTest {

    @Test
    public void boardEntityTest() {
        //given 
        String name = "자유 게시판";
        Integer sort = 1;

        //when 
        Board board = Board.builder()
                .name(name)
                .build();

        //then
        assertSame(board.getName(), name);
    }

}