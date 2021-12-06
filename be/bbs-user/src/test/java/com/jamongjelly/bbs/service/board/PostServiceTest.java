//package com.jamongjelly.bbs.service.board;
//
//import com.jamongjelly.bbs.domain.board.*;
//import com.jamongjelly.bbs.domain.user.UserRepository;
//import com.jamongjelly.bbs.dto.response.Pagination;
//import com.jamongjelly.bbs.dto.response.PostListItemResponse;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.MockitoAnnotations;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//
//@RunWith(SpringRunner.class)
//public class PostServiceTest {
//
//    private PostService postService;
//
//    @Mock
//    private PostRepository postRepository;
//    @Mock
//    private BoardRepository boardRepository;
//    @Mock
//    private AttachmentRepository attachmentRepository;
//    @Mock
//    private UserRepository userRepository;
//    @Mock
//    private PostLikeRepository postLikeRepository;
//    @Mock
//    private SubjectRepository subjectRepository;
//
//    @Before
//    public void setUp() {
//        MockitoAnnotations.initMocks(this);
//
//        postService = new PostService(postRepository, boardRepository,
//                attachmentRepository, userRepository, postLikeRepository, subjectRepository);
//    }
//
//    @Test
//    public void 전체_게시물_목록_가져오기() {
//        // given
//        int pageNum = 1;
//        int pageSize = 10;
//        Page<Post> pages = Mockito.mock(Page.class);
//
//        when(postRepository.findAll(any(Pageable.class))).thenReturn(pages);
//        when(userRepository.findById())
//
//        // when
//        Pagination<List<PostListItemResponse>> response =
//                postService.getAllPosts(pageNum, pageSize);
//
//        // then
//        verify(postRepository).findAll(any(Pageable.class));
//
//    }
//
//    @Test
//    public void getPostsByBoardId() {
//    }
//
//    @Test
//    public void searchPosts() {
//    }
//
//    @Test
//    public void searchPostsBySubjectId() {
//    }
//
//}