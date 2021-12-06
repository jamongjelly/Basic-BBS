package com.jamongjelly.bbs.dto.request;

import com.jamongjelly.bbs.constants.Constraints;
import com.jamongjelly.bbs.domain.board.Post;
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
public class PostWriteRequest {

    @NotBlank
    @Size(max = Constraints.POST_TITLE_MAX_LENGTH)
    private String title;

    @NotBlank
    @Size(min = Constraints.NICKNAME_MIN_LENGTH, max = Constraints.NICKNAME_MAX_LENGTH)
    private String writer;

    @NotBlank
    private String content;

    @NotNull
    private Boolean showReply;

    @NotNull
    private Long boardId;

    private Long subjectId;

    public Post toEntity() {
        return Post.builder()
                .title(title)
                .writer(writer)
                .content(content)
                .showReply(showReply)
                .build();
    }
}
