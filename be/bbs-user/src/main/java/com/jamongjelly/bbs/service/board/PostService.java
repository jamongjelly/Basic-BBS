package com.jamongjelly.bbs.service.board;

import com.jamongjelly.bbs.domain.board.*;
import com.jamongjelly.bbs.domain.user.User;
import com.jamongjelly.bbs.domain.user.UserRepository;
import com.jamongjelly.bbs.dto.request.PostUpdateRequest;
import com.jamongjelly.bbs.dto.request.PostWriteRequest;
import com.jamongjelly.bbs.dto.response.*;
import com.jamongjelly.bbs.exception.BadRequestException;
import com.jamongjelly.bbs.exception.ResourceNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class PostService {

    @Value("${app.resources.location}")
    private String baseFilePath;
    private String postAttachmentPath = "/board/";

    @Value("${app.resources.uriPath}")
    private String resourcesUriPath;

    private final PostRepository postRepository;

    private final BoardRepository boardRepository;

    private final AttachmentRepository attachmentRepository;

    private final UserRepository userRepository;

    private final PostLikeRepository postLikeRepository;

    private final SubjectRepository subjectRepository;

    public PostService(PostRepository postRepository, BoardRepository boardRepository,
                       AttachmentRepository attachmentRepository, UserRepository userRepository,
                       PostLikeRepository postLikeRepository, SubjectRepository subjectRepository) {
        this.postRepository = postRepository;
        this.boardRepository = boardRepository;
        this.attachmentRepository = attachmentRepository;
        this.userRepository = userRepository;
        this.postLikeRepository = postLikeRepository;
        this.subjectRepository = subjectRepository;
    }

    public Pagination<List<PostListItemResponse>> getAllPosts(int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum - 1, pageSize, Sort.Direction.DESC, "id");
        Page<Post> postPage = postRepository.findAll(pageable);

        return getPagination(mapPageToResponse(postPage), postPage);
    }

    public Pagination<List<PostListItemResponse>> getPostsByBoardId(Long boardId, int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum - 1, pageSize, Sort.Direction.DESC, "id");
        Page<Post> postPage = postRepository.findByBoardId(boardId, pageable);

        return getPagination(mapPageToResponse(postPage), postPage);
    }

    public Pagination<List<PostListItemResponse>> searchPosts(Set<PostSpecs.SearchKey> keyList, String keyword, Long boardId, int pageNum, int pageSize) {
        Map<PostSpecs.SearchKey, Object> searchKeyword = new HashMap<>();

        if (keyList.isEmpty()) {
            searchKeyword.put(PostSpecs.SearchKey.ALL, keyword);
        } else {
            for (PostSpecs.SearchKey key : keyList) {
                searchKeyword.put(key, keyword);
            }
        }

        Pageable pageable = PageRequest.of(pageNum - 1, pageSize, Sort.Direction.DESC, "id");
        Page<Post> postPage = boardId == null ?
                postRepository.findAll(PostSpecs.searchWith(searchKeyword), pageable)
                : postRepository.findAll(PostSpecs.searchWith(searchKeyword, boardId), pageable);

        return getPagination(mapPageToResponse(postPage), postPage);
    }

    public Pagination<List<PostListItemResponse>> searchPostsBySubjectId(Long subjectId, Integer pageNum, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNum - 1, pageSize, Sort.Direction.DESC, "id");
        Page<Post> postPage = postRepository.findAll(PostSpecs.searchWithSubjectId(subjectId), pageable);

        return getPagination(mapPageToResponse(postPage), postPage);
    }

    public Pagination<List<UserPostResponse>> getPostsByUserId(Long userId, Integer pageNum) {
        Pageable pageable = PageRequest.of(pageNum - 1, 10, Sort.Direction.DESC, "id");
        Page<Post> postPage = postRepository.findByCreatedBy(userId, pageable);
        List<UserPostResponse> posts = postPage.stream().map(UserPostResponse::of)
                .collect(Collectors.toList());

        return getPagination(posts, postPage);
    }

    public Pagination<List<UserPostResponse>> getUserLikedPosts(Long userId, Integer pageNum) {
        Pageable pageable = PageRequest.of(pageNum - 1, 10, Sort.Direction.DESC, "id");
        Page<Post> postPage = postLikeRepository.findPostsByUserId(userId, pageable);
        List<UserPostResponse> posts = postPage.stream().map(UserPostResponse::of)
                .collect(Collectors.toList());

        return getPagination(posts, postPage);
    }

    @Transactional
    public PostDetailsResponse writePost(PostWriteRequest request) {
            Post post = request.toEntity();
            post.setBoard(boardRepository.getOne(request.getBoardId()));
            if (request.getSubjectId() != null) {
                post.setSubject(subjectRepository.getOne(request.getSubjectId()));
            }

            Post result = postRepository.save(post);
            User user = userRepository.findById(result.getCreatedBy())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", result.getCreatedBy()));
            return PostDetailsResponse.of(result, user);
    }

    @Transactional
    public PostDetailsResponse readPost(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId));
        User writer = userRepository.findById(post.getCreatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", post.getCreatedBy()));

        if (userId == null) {
            return PostDetailsResponse.of(post, writer);
        } else {
            boolean like = postLikeRepository.findByPostIdAndUserId(postId, userId).isPresent();

            return PostDetailsResponse.of(post, writer, like);
        }
    }

    @Transactional
    public PostDetailsResponse updatePost(Long postId, PostUpdateRequest request) {
        return postRepository.findById(postId)
                .map(post -> {
                    post.updatePost(request.getTitle(), request.getContent(), request.getShowReply());

                    if (!post.getBoard().getId().equals(request.getBoardId())) {
                        post.setBoard(boardRepository.getOne(request.getBoardId()));
                    }

                    if (request.getSubjectId() != null) {
                        post.setSubject(subjectRepository.getOne(request.getSubjectId()));
                    } else {
                        post.setSubject(null);
                    }

                    User user = userRepository.findById(post.getCreatedBy())
                            .orElseThrow(() -> new ResourceNotFoundException("User", "id", post.getCreatedBy()));

                    return PostDetailsResponse.of(post, user);
                }).orElseThrow(() -> new BadRequestException("게시글 수정 실패"));
    }

    @Transactional
    public boolean deletePost(Long postId) {
        return postRepository.findById(postId)
                .map(post -> {
                    postLikeRepository.deleteByPostId(post.getId());
                    postRepository.delete(post);
                    return true;
                })
                .orElseGet(() -> false);
    }

    @Transactional
    public String addAttachment(Long postId, MultipartFile file, String baseUrl) {
        String originalFileName = file.getOriginalFilename();

        assert originalFileName != null;
        int extPosition = originalFileName.lastIndexOf('.');
        String extension = originalFileName.substring(extPosition + 1);

        String savePath = baseFilePath + "/board/";
        String uuidFileName = UUID.randomUUID().toString();

        try {
            File saveDir = new File(savePath);
            if (!saveDir.exists()) {
                saveDir.mkdirs();
            }

            Files.write(Paths.get(savePath + uuidFileName + "." + extension), file.getBytes());

            Post post = postRepository.findById(postId)
                    .orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId));

            Attachment attachment = Attachment.builder()
                    .originalFileName(originalFileName)
                    .extension(extension)
                    .path(baseUrl + resourcesUriPath + postAttachmentPath)
                    .fileName(uuidFileName)
                    .size(file.getSize())
                    .build();
            attachment.setPost(post);
            attachmentRepository.save(attachment);

            return attachment.getFileUrl();
        } catch(IOException e) {
            log.error("Fail to save a Post Attachment", e);
            return null;
        }
    }

    public List<PostAttachmentResponse> getPostAttachments(Long postId) {
        return postRepository.findById(postId)
                .map(post ->
                    post.getAttachments().stream().map(PostAttachmentResponse::of)
                            .collect(Collectors.toList())
                ).orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId));
    }

    @Transactional
    public boolean removePostAttachment(Long attachmentId) {
        return attachmentRepository.findById(attachmentId)
                .map(attachment -> {
                    attachmentRepository.delete(attachment);
                    return true;
                }).orElseGet(() -> false);
    }

    @Transactional
    public boolean likePost(Long postId, Long userId) {
        try {
            Post post = postRepository.getOne(postId);
            PostLike postLike = PostLike.builder()
                    .post(post)
                    .user(userRepository.getOne(userId))
                    .build();
            postLikeRepository.save(postLike);
            post.increaseLikeCnt();

            return true;
        } catch (Exception e) {
            log.error("likePost() error occurred",e);
            return false;
        }
    }

    @Transactional
    public boolean unlikePost(Long postId, Long userId) {
        return postLikeRepository.findByPostIdAndUserId(postId, userId)
                .map(postLike -> {
                    postLike.getPost().decreaseLikeCnt();
                    postLikeRepository.delete(postLike);
                    return true;
                }).orElseGet(() -> false);
    }

    private List<PostListItemResponse> mapPageToResponse(Page<Post> postPage) {
        return postPage.stream()
                .map(post -> {
                    User user = userRepository.findById(post.getCreatedBy())
                            .orElseThrow(() -> new ResourceNotFoundException("User", "id", post.getCreatedBy()));
                    return PostListItemResponse.of(post, user);
                }).collect(Collectors.toList());
    }

    private <T> Pagination<T> getPagination(T body, Integer pageNum, Integer pageSize,
                                            Integer totalPages, Long totalElements) {
        return Pagination.<T>builder()
                .pageNum(pageNum)
                .pageSize(pageSize)
                .totalPages(totalPages)
                .totalElements(totalElements)
                .body(body)
                .build();
    }

    private <T1, T2> Pagination<List<T1>> getPagination(List<T1> body, Page<T2> page) {
        return getPagination(body, page.getNumber() + 1, page.getSize(), page.getTotalPages(), page.getTotalElements());
    }

    @Transactional
    public void increaseViewCnt(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId));
        post.increaseViewCnt();
    }
}
