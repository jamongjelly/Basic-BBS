package com.jamongjelly.bbs.domain.board;

import com.jamongjelly.bbs.domain.UserDateAudit;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "attachments")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Attachment extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String originalFileName;

    @Column(nullable = false)
    private String path;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String extension;

    @Column(nullable = false)
    private Long size;

    @ManyToOne
    private Post post;

    @Builder
    public Attachment(String originalFileName, String path, String fileName, String extension, Long size) {
        this.originalFileName = originalFileName;
        this.path = path;
        this.fileName = fileName;
        this.extension = extension;
        this.size = size;
    }

    public void setPost(Post post) {
        post.getAttachments().add(this);
        this.post = post;
    }

    public String getFileUrl() {
        return path + fileName + "." + extension;
    }
}
