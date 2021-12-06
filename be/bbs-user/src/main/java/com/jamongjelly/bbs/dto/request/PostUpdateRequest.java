package com.jamongjelly.bbs.dto.request;

import com.jamongjelly.bbs.constants.Constraints;
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
public class PostUpdateRequest {

    @NotBlank
    @Size(max = Constraints.POST_TITLE_MAX_LENGTH)
    private String title;

    @NotBlank
    private String content;

    @NotNull
    private Boolean showReply;

    @NotNull
    private Long boardId;

    private Long subjectId;

}
