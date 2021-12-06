package com.jamongjelly.bbs.controller;

import com.jamongjelly.bbs.constants.WebConst;
import com.jamongjelly.bbs.dto.request.SubjectRequest;
import com.jamongjelly.bbs.dto.response.SubjectResponse;
import com.jamongjelly.bbs.service.board.SubjectService;
import com.jamongjelly.bbs.util.HttpUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(WebConst.SUBJECTS)
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping(WebConst.SUBJECTS_BOARD + "/{boardId}")
    public ResponseEntity<List<SubjectResponse>> getSubjectsByBoardId(@PathVariable Long boardId) {
        return ResponseEntity.ok(subjectService.getSubjectsByBoardId(boardId));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> addSubject(@RequestBody @Valid SubjectRequest subjectRequest) {
        boolean result = subjectService.addNewSubject(subjectRequest);
        return HttpUtils.stringResponse(result, "말머리 추가 성공", "말머리 추가 실패");
    }

    @PutMapping("/{subjectId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> modifySubject(@PathVariable Long subjectId, @RequestBody @Valid SubjectRequest request) {
        boolean result = subjectService.modifySubject(subjectId, request);
        return HttpUtils.stringResponse(result, "말머리 수정 성공", "말머리 수정 실패");
    }

    @DeleteMapping("/{subjectId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> removeSubject(@PathVariable Long subjectId) {
        boolean result = subjectService.removeSubject(subjectId);
        return HttpUtils.stringResponse(result, "말머리 삭제 성공", "말머리 삭제 실패");
    }
}
