package com.jamongjelly.bbs.dto.response;

import com.jamongjelly.bbs.domain.board.Board;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class BoardResponse {

    private Long id;

    private String name;

    private String path;

    private Integer sort;

    private BoardResponse(Long id, String name, String path, Integer sort) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.sort = sort;
    }

    public static BoardResponse of(Board board) {
        return new BoardResponse(board.getId(), board.getName(), board.getPath(), board.getSort());
    }
}
