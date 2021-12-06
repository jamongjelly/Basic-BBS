package com.jamongjelly.bbs.domain.board;

import com.jamongjelly.bbs.domain.DateAudit;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "subjects")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Subject extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    private Board board;

    @OneToMany(mappedBy = "subject", fetch = FetchType.LAZY)
    private List<Post> posts = new ArrayList<>();

    @Builder
    public Subject(String name, Board board) {
        this.name = name;
        this.board = board;
    }

    public void setName(String name) {
        this.name = name;
    }

}
