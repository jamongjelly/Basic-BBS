package com.jamongjelly.bbs.dto.request;

import com.jamongjelly.bbs.constants.Constraints;
import com.jamongjelly.bbs.domain.board.Board;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardRequest {

    @NotNull
    private Long id;

    @NotBlank
    @Size(max = Constraints.BOARD_NAME_MAX_LENGTH)
    private String name;

    @NotBlank
    @Size(max = Constraints.BOARD_PATH_MAX_LENGTH)
    private String path;

    @NotNull
    private Integer sort;

    @Builder
    public BoardRequest(Long id, String name, String path, Integer sort) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.sort = sort;
    }

    public Board toEntity() {
        return Board.builder()
                .id(id)
                .name(name)
                .path(path)
                .sort(sort)
                .build();
    }
}
