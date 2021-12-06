package com.jamongjelly.bbs.controller;

import com.jamongjelly.bbs.constants.WebConst;
import com.jamongjelly.bbs.dto.request.BoardRequest;
import com.jamongjelly.bbs.dto.response.BoardResponse;
import com.jamongjelly.bbs.service.board.BoardService;
import com.jamongjelly.bbs.util.HttpUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(WebConst.BOARDS)
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping
    public ResponseEntity<List<BoardResponse>> getBoardList() {
        List<BoardResponse> response = boardService.getBoardList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{boardId:[0-9]+}")
    public ResponseEntity<BoardResponse> getBoard(@PathVariable Long boardId) {
        return ResponseEntity.ok(boardService.getBoard(boardId));
    }

    @GetMapping("/{path:[a-z]+}")
    public ResponseEntity<BoardResponse> getBoardByPath(@PathVariable String path) {
        return ResponseEntity.ok(boardService.getBoardByPath(path));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<BoardResponse> addNewBoard(@Valid @RequestBody BoardRequest request) {
        return ResponseEntity.ok(boardService.addNewBoard(request));
    }

    @PutMapping("/{boardId:[0-9]+}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<BoardResponse> modifyBoard(@PathVariable Long boardId, @Valid @RequestBody BoardRequest request) {
        return ResponseEntity.ok(boardService.modifyBoard(boardId, request));
    }

    @DeleteMapping("/{boardId:[0-9]+}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> removeBoard(@PathVariable Long boardId) {
        boolean result = boardService.removeBoard(boardId);
        return HttpUtils.stringResponse(result, "게시판 제거 성공", "게시판 제거 실패");
    }
}
