package com.jamongjelly.bbs.domain.user;

import com.jamongjelly.bbs.constants.Constraints;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

@Entity
@Table(name = "roles")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = Constraints.ROLE_NAME_MAX_LENGTH)
    private RoleName name;

    public Role(Integer id, RoleName name) {
        this.id = id;
        this.name = name;
    }
}
