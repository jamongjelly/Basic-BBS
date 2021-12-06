package com.jamongjelly.bbs.dto.request;

import com.jamongjelly.bbs.constants.Constraints;
import com.jamongjelly.bbs.domain.board.Board;
import com.jamongjelly.bbs.domain.board.Subject;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@ToString
public class SubjectRequest {

    @NotBlank
    @Size(max = Constraints.SUBJECT_NAME_MAX_LENGTH)
    private String name;

    @NotNull
    private Long boardId;

    public Subject toEntity(Board board) {
        return Subject.builder()
                .name(name)
                .board(board)
                .build();
    }

}
