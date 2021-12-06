package com.jamongjelly.bbs.dto.response;

import com.jamongjelly.bbs.domain.todo.Todo;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class TodoResponse {

    private Long id;

    private Boolean done;

    private String text;

    private TodoResponse(Long id, Boolean done, String text) {
        this.id = id;
        this.done = done;
        this.text = text;
    }

    public static TodoResponse of(Todo todo) {
        return new TodoResponse(todo.getId(), todo.getDone(), todo.getText());
    }
}
