package com.jamongjelly.bbs.domain.user;

import com.jamongjelly.bbs.constants.Constraints;
import com.jamongjelly.bbs.domain.DateAudit;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "email"
        })
})
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String nickname;

    private String password;

    @Enumerated(value = EnumType.ORDINAL)
    @Column(length = Constraints.USER_STATUS_MAX_LENGTH)
    private UserStatus status;

    private String imgUrl;

    private String profileMsg;

    @Column(nullable = false)
    private Boolean emailVerified = false;

    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    @Builder
    public User(String email, String nickname, String password, String imgUrl) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.imgUrl = imgUrl;
    }

    public void addUserRole(Role role) {
        roles.add(role);
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setProfileMsg(String profileMsg) {
        this.profileMsg = profileMsg;
    }

    public void setImgUrl(String profileImgUrl) {
        this.imgUrl = profileImgUrl;
    }

    public void setProvider(AuthProvider provider) {
        this.provider = provider;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public void unregister() {
        this.email = null;
        this.status = UserStatus.UNREGISTER;
    }
}
