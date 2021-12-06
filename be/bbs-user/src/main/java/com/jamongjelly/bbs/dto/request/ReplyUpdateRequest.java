package com.jamongjelly.bbs.dto.request;

import com.jamongjelly.bbs.constants.Constraints;
import com.jamongjelly.bbs.domain.board.Reply;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReplyUpdateRequest {

    @NotBlank
    @Size(max = Constraints.REPLY_MAX_LENGTH)
    private String content;

    @NotNull
    private Long postId;

    public Reply toEntity() {
        return Reply.builder()
                .content(content)
                .build();
    }

}
