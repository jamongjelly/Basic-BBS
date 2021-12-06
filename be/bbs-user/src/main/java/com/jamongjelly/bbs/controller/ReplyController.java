package com.jamongjelly.bbs.controller;

import com.jamongjelly.bbs.constants.WebConst;
import com.jamongjelly.bbs.dto.request.ReplyUpdateRequest;
import com.jamongjelly.bbs.dto.response.Pagination;
import com.jamongjelly.bbs.dto.request.ReplyWriteRequest;
import com.jamongjelly.bbs.dto.response.ReplyResponse;
import com.jamongjelly.bbs.dto.response.UserReplyResponse;
import com.jamongjelly.bbs.security.CurrentUser;
import com.jamongjelly.bbs.security.UserPrincipal;
import com.jamongjelly.bbs.service.board.ReplyService;
import com.jamongjelly.bbs.util.HttpUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping(WebConst.REPLIES)
public class ReplyController {

    private final ReplyService replyService;

    public ReplyController(ReplyService replyService) {
        this.replyService = replyService;
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ReplyResponse> writeReply(@RequestBody @Valid ReplyWriteRequest request) {
        ReplyResponse response = replyService.writeReply(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping(WebConst.REPLIES_POST + "/{postId}")
    public ResponseEntity<List<ReplyResponse>> getRepliesByPostId(@PathVariable Long postId) {
        return ResponseEntity.ok(replyService.getRepliesByPostId(postId));
    }

    @GetMapping(WebConst.REPLIES_CURRENT_USER)
    public ResponseEntity<Pagination<List<UserReplyResponse>>> getCurrentUserReplies(
            @CurrentUser UserPrincipal currentUser,
            @RequestParam(required = false, defaultValue = "1") @Valid @NotNull Integer pageNum) {
        return ResponseEntity.ok(replyService.getRepliesByUserId(currentUser.getUserId(), pageNum));
    }

    @PutMapping("/{replyId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ReplyResponse> updateReply(@PathVariable Long replyId,
            @RequestBody @Valid ReplyUpdateRequest request) {
        ReplyResponse response = replyService.updateReply(replyId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{replyId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Long> deleteReply(@PathVariable Long replyId) {
        Long response = replyService.deleteReply(replyId);
        return ResponseEntity.ok(response);
    }
}
