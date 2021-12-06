package com.jamongjelly.bbs.domain.todo;

import com.jamongjelly.bbs.domain.UserDateAudit;
import lombok.*;

import javax.persistence.*;
import java.util.Optional;

@Entity
@Table(name = "todos")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean done;

    @Column(nullable = false)
    private String text;

    @Builder
    public Todo(Boolean done, String text) {
        this.done = done != null ? done : false;
        this.text = text;
    }

    public void update(Boolean done, String text) {
        this.done = done;
        this.text = text;
    }
}
