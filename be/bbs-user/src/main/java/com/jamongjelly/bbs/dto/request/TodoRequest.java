package com.jamongjelly.bbs.dto.request;

import com.jamongjelly.bbs.constants.Constraints;
import com.jamongjelly.bbs.domain.todo.Todo;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodoRequest {

    private Boolean done;

    @NotBlank
    @Size(max = Constraints.TODO_MAX_LENGTH)
    private String text;

    public Todo toEntity() {
        return Todo.builder()
                .done(done)
                .text(text)
                .build();
    }

}
