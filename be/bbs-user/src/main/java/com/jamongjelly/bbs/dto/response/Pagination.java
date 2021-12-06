package com.jamongjelly.bbs.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class Pagination<T> {

    private Integer pageNum;

    private Integer pageSize;

    private Integer totalPages;

    private Long totalElements;

    private T body;

    @Builder
    public Pagination(Integer pageNum, Integer pageSize, Long totalElements, Integer totalPages, T body) {
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.body = body;
    }
}
