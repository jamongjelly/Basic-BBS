package com.jamongjelly.bbs.service.board;

import com.jamongjelly.bbs.domain.board.Board;
import com.jamongjelly.bbs.domain.board.BoardRepository;
import com.jamongjelly.bbs.dto.request.BoardRequest;
import com.jamongjelly.bbs.dto.response.BoardResponse;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class BoardServiceTest {

    private BoardService boardService;
    @Mock
    private BoardRepository boardRepository;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        boardService = new BoardService(boardRepository);
    }

    @Test
    public void addNewBoard() {
        // given
        String givenBoardName = "애완동물";
        String givenBoardPath = "pet";
        int givenBoardSort = 1;

        BoardRequest request = BoardRequest.builder()
                .id(1001L)
                .name(givenBoardName)
                .path(givenBoardPath)
                .sort(givenBoardSort)
                .build();

        Board petBoard = request.toEntity();
        given(boardRepository.save(any(Board.class))).willReturn(petBoard);

        // when
        BoardResponse response = boardService.addNewBoard(request);

        // then
        assertThat(response.getName(), equalTo(givenBoardName));
        assertThat(response.getPath(), equalTo(givenBoardPath));
        verify(boardRepository, times(1)).save(Mockito.any(Board.class));
    }

    @Test
    public void modifyBoard() {
        // given
        Long id = 1001L;
        String newBoardName = "예능";

        BoardRequest request = BoardRequest.builder()
                .id(id)
                .name(newBoardName)
                .build();

        given(boardRepository.findById(id)).willReturn(Optional.of(request.toEntity()));

        // when
        BoardResponse response = boardService.modifyBoard(id, request);

        // then
        assertThat(response.getName(), equalTo(newBoardName));
        verify(boardRepository, times(1)).findById(id);
    }

}