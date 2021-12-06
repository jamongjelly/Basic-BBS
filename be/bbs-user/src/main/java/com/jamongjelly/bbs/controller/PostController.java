package com.jamongjelly.bbs.controller;

import com.jamongjelly.bbs.constants.WebConst;
import com.jamongjelly.bbs.domain.board.PostSpecs;
import com.jamongjelly.bbs.dto.request.PostUpdateRequest;
import com.jamongjelly.bbs.dto.request.PostWriteRequest;
import com.jamongjelly.bbs.dto.response.*;
import com.jamongjelly.bbs.security.CurrentUser;
import com.jamongjelly.bbs.security.UserPrincipal;
import com.jamongjelly.bbs.service.board.PostService;
import com.jamongjelly.bbs.util.CookieUtils;
import com.jamongjelly.bbs.util.HttpUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(WebConst.POSTS)
public class PostController {

    public static final String POST_READ_REQUEST_COOKIE_NAME = "post_read_request";
    private static final int cookieExpireSeconds = 24 * 60 * 60;

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<Pagination<List<PostListItemResponse>>> getAllPosts(
            @RequestParam(required = false, defaultValue = "1") @Valid @NotNull Integer pageNum,
            @RequestParam(required = false, defaultValue = "10") @Valid @NotNull Integer pageSize) {
        return ResponseEntity.ok(postService.getAllPosts(pageNum, pageSize));
    }

    @GetMapping(WebConst.POSTS_BOARD + "/{boardId}")
    public ResponseEntity<Pagination<List<PostListItemResponse>>> getPostsByBoardId(
            @PathVariable Long boardId,
            @RequestParam(required = false, defaultValue = "1") @Valid @NotNull Integer pageNum,
            @RequestParam(required = false, defaultValue = "10") @Valid @NotNull Integer pageSize) {
        return ResponseEntity.ok(postService.getPostsByBoardId(boardId, pageNum, pageSize));
    }

    @GetMapping(WebConst.POSTS_SEARCH)
    public ResponseEntity<Pagination<List<PostListItemResponse>>> searchPosts(
            @RequestParam(required = false) Long boardId,
            @RequestParam(required = false, defaultValue = "1") @Valid @NotNull Integer pageNum,
            @RequestParam(required = false, defaultValue = "10") @Valid @NotNull Integer pageSize,
            @RequestParam(required = false, defaultValue = "") @Valid @NotEmpty String searchType,
            @RequestParam @Valid @NotBlank String keyword) {

        Set<PostSpecs.SearchKey> keyList = new HashSet<>();

        for (char type : searchType.toCharArray()) {
            switch (type) {
                case 't':
                    keyList.add(PostSpecs.SearchKey.TITLE);
                    break;
                case 'w':
                    keyList.add(PostSpecs.SearchKey.WRITER);
                    break;
                case 'c':
                    keyList.add(PostSpecs.SearchKey.CONTENT);
                    break;
            }
        }

        return ResponseEntity.ok(postService.searchPosts(keyList, keyword, boardId, pageNum, pageSize));
    }

    @GetMapping(WebConst.POSTS_SEARCH_BY_SUBJECT_ID + "/{subjectId}")
    public ResponseEntity<Pagination<List<PostListItemResponse>>> searchPostsBySubjectId(
            @PathVariable @Valid @NotNull Long subjectId,
            @RequestParam(required = false, defaultValue = "1") @Valid @NotNull Integer pageNum,
            @RequestParam(required = false, defaultValue = "10") @Valid @NotNull Integer pageSize
    ) {
        Pagination<List<PostListItemResponse>> response = postService.searchPostsBySubjectId(subjectId, pageNum, pageSize);
        return ResponseEntity.ok(response);
    }

    @GetMapping(WebConst.POSTS_CURRENT_USER)
    public ResponseEntity<Pagination<List<UserPostResponse>>> getCurrentUserPosts(
            @CurrentUser UserPrincipal currentUser,
            @RequestParam(required = false, defaultValue = "1") @Valid @NotNull Integer pageNum) {
        return ResponseEntity.ok(postService.getPostsByUserId(currentUser.getUserId(), pageNum));
    }

    @GetMapping(WebConst.POSTS_LIKE)
    public ResponseEntity<Pagination<List<UserPostResponse>>> getUserLikedPosts(
            @CurrentUser UserPrincipal currentUser,
            @RequestParam(required = false, defaultValue = "1") @Valid @NotNull Integer pageNum) {
        return ResponseEntity.ok(postService.getUserLikedPosts(currentUser.getUserId(), pageNum));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PostDetailsResponse> writePost(@RequestBody @Valid PostWriteRequest request) {
        PostDetailsResponse response = postService.writePost(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDetailsResponse> readPost(@PathVariable Long postId,
        @CurrentUser UserPrincipal currentUser, HttpServletRequest request, HttpServletResponse response
    ) {
        Cookie readPostCookie = CookieUtils.getCookie(request, POST_READ_REQUEST_COOKIE_NAME)
                .map(cookie -> {
                    if (cookie.getValue().contains(postId.toString())) {
                        System.out.println("이미 방문한 게시글입니다.");
                    } else {
                        cookie.setValue(cookie.getValue() + "|" + postId);
                        postService.increaseViewCnt(postId);
                    }
                    return cookie;
                }).orElseGet(() -> {
                    Cookie cookie = new Cookie(POST_READ_REQUEST_COOKIE_NAME, postId.toString());
                    cookie.setPath("/");
                    cookie.setHttpOnly(false);
                    cookie.setMaxAge(cookieExpireSeconds);

                    postService.increaseViewCnt(postId);
                    return cookie;
                });

        response.addCookie(readPostCookie);

        PostDetailsResponse post = postService.readPost(postId, currentUser != null ? currentUser.getUserId() : null);

        return ResponseEntity.ok(post);
    }

    @PutMapping("/{postId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PostDetailsResponse> updatePost(@PathVariable Long postId,
            @RequestBody @Valid PostUpdateRequest request) {
        PostDetailsResponse response = postService.updatePost(postId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{postId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> deletePost(@PathVariable Long postId) {
        boolean result = postService.deletePost(postId);
        return HttpUtils.stringResponse(result, "글 삭제 성공", "글 삭제 실패");
    }

    @PostMapping("/{postId}" + WebConst.POSTS_ATTACHMENTS)
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> addPostAttachment(@PathVariable Long postId,
            @RequestParam @Valid @NotNull MultipartFile file, HttpServletRequest request) {
        String fileUrl = postService.addAttachment(postId, file, HttpUtils.getBaseUrl(request));
        return ResponseEntity.ok(fileUrl);
    }

    @GetMapping("/{postId}" + WebConst.POSTS_ATTACHMENTS)
    public ResponseEntity<List<PostAttachmentResponse>> getPostAttachments(@PathVariable Long postId) {
        List<PostAttachmentResponse> response = postService.getPostAttachments(postId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(WebConst.POSTS_ATTACHMENTS + "/{attachmentId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> removePostAttachment(@PathVariable Long attachmentId) {
        boolean result = postService.removePostAttachment(attachmentId);
        return HttpUtils.stringResponse(result, "첨부 파일 삭제 성공", "첨부 파일 삭제 실패");
    }

    @PostMapping("/{postId}" + WebConst.POSTS_LIKE)
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> likePost(@PathVariable Long postId, @CurrentUser UserPrincipal currentUser) {
        boolean result = postService.likePost(postId, currentUser.getUserId());
        return HttpUtils.stringResponse(result, "좋아요 등록 성공", "좋아요 등록 실패");
    }

    @DeleteMapping("/{postId}" + WebConst.POSTS_LIKE)
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> unlikePost(@PathVariable Long postId, @CurrentUser UserPrincipal currentUser) {
        boolean result = postService.unlikePost(postId, currentUser.getUserId());
        return HttpUtils.stringResponse(result, "좋아요 취소 성공", "좋아요 취소 실패");
    }

}
