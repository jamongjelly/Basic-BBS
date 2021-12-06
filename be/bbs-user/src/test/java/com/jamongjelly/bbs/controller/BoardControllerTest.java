//package com.jamongjelly.bbs.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.jamongjelly.bbs.dto.request.BoardRequest;
//import com.jamongjelly.bbs.dto.response.BoardResponse;
//import com.jamongjelly.bbs.domain.board.Board;
//import com.jamongjelly.bbs.domain.board.BoardRepository;
//import com.jamongjelly.bbs.service.board.BoardService;
//import org.junit.After;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.boot.web.server.LocalServerPort;
//import org.springframework.http.MediaType;
//import org.springframework.security.test.context.support.WithUserDetails;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.web.context.WebApplicationContext;
//import org.springframework.web.filter.CharacterEncodingFilter;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.hamcrest.Matchers.containsString;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//public class BoardControllerTest {
//
//    @LocalServerPort
//    private int port;
//
//    private String baseUrl = "http://localhost:" + port;
//
//    @Autowired
//    private BoardRepository boardRepository;
//
//    @Autowired
//    private WebApplicationContext context;
//
//    private MockMvc mvc;
//
//    @MockBean
//    private BoardService boardService;
//
//    @Before
//    public void setup() {
//        mvc = MockMvcBuilders
//                .webAppContextSetup(context)
//                .addFilters(new CharacterEncodingFilter("UTF-8", true))
//                .apply(springSecurity())
//                .build();
//    }
//
//    @After
//    public void tearDown() {
//        boardRepository.deleteAll();
//    }
//
////    @Test
////    @WithUserDetails("user")
////    public void addBoardTest() throws Exception {
////        //given
////        String name = "테스트 게시판";
////        Integer sort = 1;
////
////        BoardRequest request = BoardRequest.builder()
////                .name(name)
////                .sort(sort)
////                .build();
////
////        String url = baseUrl + "/boards";
////
////        //when
////        mvc.perform(post(url)
////                .contentType(MediaType.APPLICATION_JSON)
////                .content(new ObjectMapper().writeValueAsString(request)))
////                .andExpect(status().isOk());
////
////        //then
////        List<Board> all = boardRepository.findAll();
////        assertThat(all.get(0).getName()).isEqualTo(name);
////        assertThat(all.get(0).getSort()).isEqualTo(sort);
////    }
////
////    @Test
////    @WithUserDetails("user")
////    public void getBoardListTest() throws Exception {
////        //given
////        String name = "테스트 게시판";
////        Integer sort = 5;
////        Board board = Board.builder().name(name).sort(sort).build();
////
////        List<BoardResponse> responses = new ArrayList<>();
////        responses.add(BoardResponse.of(board));
////
////        given(boardService.getBoardList()).willReturn(responses);
////
////        String url = baseUrl + "/boards";
////
////        //when
////        mvc.perform(get(url)
////                .accept(MediaType.APPLICATION_JSON)
////        )
////                .andExpect(status().isOk())
////                .andExpect(content().string(containsString(name)))
////                .andExpect(content().string(containsString("\"sort\":"+sort)));
////    }
////
////    @Test
////    @WithUserDetails("user")
////    public void modifyBoardTest() throws Exception {
////        //given
////        String newName = "(수정) 테스트 게시판";
////        Integer sort = 10;
////    }
//}