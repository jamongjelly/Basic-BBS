package com.jamongjelly.bbs.dto.response;

import com.jamongjelly.bbs.domain.board.Subject;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SubjectResponse {

    private Long id;

    private String name;

    private Long boardId;

    private SubjectResponse(Long id, String name, Long boardId) {
        this.id = id;
        this.name = name;
        this.boardId = boardId;
    }

    public static SubjectResponse of(Subject subject) {
        if (subject == null) return null;
        return new SubjectResponse(subject.getId(), subject.getName(), subject.getBoard().getId());
    }
}
