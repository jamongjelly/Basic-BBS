package com.jamongjelly.bbs.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class PostPageResponse {

    private Pagination pagination;

    private List<PostListItemResponse> posts;

    @Builder
    public PostPageResponse(Pagination pagination, List<PostListItemResponse> posts) {
        this.pagination = pagination;
        this.posts = posts;
    }

}
