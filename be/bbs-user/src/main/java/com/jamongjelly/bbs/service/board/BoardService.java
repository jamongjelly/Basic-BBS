package com.jamongjelly.bbs.service.board;

import com.jamongjelly.bbs.domain.board.Board;
import com.jamongjelly.bbs.domain.board.BoardRepository;
import com.jamongjelly.bbs.dto.request.BoardRequest;
import com.jamongjelly.bbs.dto.response.BoardResponse;
import com.jamongjelly.bbs.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public List<BoardResponse> getBoardList() {
        return boardRepository.findAll()
                .stream().map(BoardResponse::of).collect(Collectors.toList());
    }

    public BoardResponse addNewBoard(BoardRequest request) {
        return BoardResponse.of(boardRepository.save(request.toEntity()));
    }

    @Transactional
    public BoardResponse modifyBoard(Long boardId, BoardRequest request) {
        return boardRepository.findById(boardId)
                .map(board -> {
                    board.setName(request.getName());
                    board.setPath(request.getPath());
                    board.setOrder(request.getSort());
                    return BoardResponse.of(board);
                }).orElseThrow(() -> new ResourceNotFoundException("Board", "id", boardId));
    }

    @Transactional
    public boolean removeBoard(Long boardId) {
        return boardRepository.findById(boardId)
                .map(board -> {
                    boardRepository.delete(board);
                    return true;
                }).orElseGet(() -> false);
    }

    public BoardResponse getBoardByPath(String path) {
        Board board = boardRepository.findByPath(path)
                .orElseThrow(() -> new ResourceNotFoundException("Board", "path", path));
        return BoardResponse.of(board);
    }

    public BoardResponse getBoard(Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new ResourceNotFoundException("Board", "id", boardId));
        return BoardResponse.of(board);
    }

}
