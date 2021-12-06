package com.jamongjelly.bbs.service.board;

import com.jamongjelly.bbs.domain.board.ReplyRepository;
import com.jamongjelly.bbs.dto.request.ReplyUpdateRequest;
import com.jamongjelly.bbs.dto.response.Pagination;
import com.jamongjelly.bbs.dto.request.ReplyWriteRequest;
import com.jamongjelly.bbs.dto.response.ReplyResponse;
import com.jamongjelly.bbs.dto.response.UserReplyResponse;
import com.jamongjelly.bbs.domain.board.Post;
import com.jamongjelly.bbs.domain.board.Reply;
import com.jamongjelly.bbs.domain.user.User;
import com.jamongjelly.bbs.exception.BadRequestException;
import com.jamongjelly.bbs.exception.ResourceNotFoundException;
import com.jamongjelly.bbs.domain.board.PostRepository;
import com.jamongjelly.bbs.domain.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ReplyService {

    private final ReplyRepository replyRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public ReplyService(ReplyRepository replyRepository, PostRepository postRepository, UserRepository userRepository) {
        this.replyRepository = replyRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ReplyResponse writeReply(ReplyWriteRequest request) {
            Reply reply = request.toEntity();
            Post post = postRepository.findById(request.getPostId())
                    .orElseThrow(() -> new ResourceNotFoundException("Post", "id", reply.getId()));
            reply.setPost(post);
            post.increaseReplyCnt();

            Reply result = replyRepository.save(reply);
            User user = userRepository.findById(result.getCreatedBy())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", result.getCreatedBy()));

            return ReplyResponse.of(result, user);
    }

    @Transactional
    public List<ReplyResponse> getRepliesByPostId(Long postId) {
        return replyRepository.findByPostIdIn(postId)
                .stream().map(reply -> {
                    User user = userRepository.findById(reply.getCreatedBy())
                            .orElseThrow(() -> new ResourceNotFoundException("User", "id", reply.getCreatedBy()));
                    return ReplyResponse.of(reply, user);
                }).collect(Collectors.toList());
    }

    public Pagination<List<UserReplyResponse>> getRepliesByUserId(Long userId, Integer pageNum) {
        Pageable pageable = PageRequest.of(pageNum - 1, 10, Sort.Direction.DESC, "id");
        Page<Reply> replyPages = replyRepository.findByUserId(userId, pageable);
        List<UserReplyResponse> replies = replyPages.stream().map(UserReplyResponse::of)
                .collect(Collectors.toList());
        return Pagination.<List<UserReplyResponse>>builder()
                .pageNum(pageNum)
                .pageSize(10)
                .totalElements(replyPages.getTotalElements())
                .totalPages(replyPages.getTotalPages())
                .body(replies)
                .build();
    }

    @Transactional
    public ReplyResponse updateReply(Long replyId, ReplyUpdateRequest request) {
        return replyRepository.findById(replyId)
                .map(reply -> {
                    reply.updateContent(request.getContent());
                    User user = userRepository.findById(reply.getCreatedBy())
                            .orElseThrow(() -> new ResourceNotFoundException("User", "id", reply.getCreatedBy()));
                    return ReplyResponse.of(reply, user);
                }).orElseThrow(() -> new BadRequestException("댓글 수정 실패"));
    }

    @Transactional
    public Long deleteReply(Long replyId) {
        return replyRepository.findById(replyId)
                .map(reply -> {
                    replyRepository.delete(reply);
                    reply.getPost().decreaseReplyCnt();
                    return replyId;
                }).orElseThrow(() -> new BadRequestException("댓글 삭제 실패"));
    }

}
