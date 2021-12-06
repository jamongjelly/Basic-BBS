package com.jamongjelly.bbs.dto.response;

import com.jamongjelly.bbs.domain.board.Attachment;
import lombok.Getter;

@Getter
public class PostAttachmentResponse {

    private String originalFileName;

    private Long size;

    private PostAttachmentResponse(String originalFileName, Long size) {
        this.originalFileName = originalFileName;
        this.size = size;
    }

    public static PostAttachmentResponse of(Attachment attachment) {
        return new PostAttachmentResponse(attachment.getOriginalFileName(), attachment.getSize());
    }
}
