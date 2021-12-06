package com.jamongjelly.bbs.domain.board;

import com.jamongjelly.bbs.domain.DateAudit;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "boards")
@Getter
@ToString(exclude = "posts")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String path;

    private Integer sort;

    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY)
    private List<Post> posts = new ArrayList<>();

    @Builder
    public Board(Long id, String name, String path, Integer sort) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.sort = sort;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public void setOrder(Integer sort) {
        this.sort = sort;
    }

}
