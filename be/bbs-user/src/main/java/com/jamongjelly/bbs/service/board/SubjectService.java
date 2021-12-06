package com.jamongjelly.bbs.service.board;

import com.jamongjelly.bbs.dto.request.SubjectRequest;
import com.jamongjelly.bbs.dto.response.SubjectResponse;
import com.jamongjelly.bbs.domain.board.Subject;
import com.jamongjelly.bbs.domain.board.BoardRepository;
import com.jamongjelly.bbs.domain.board.SubjectRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SubjectService {

    private final BoardRepository boardRepository;
    private final SubjectRepository subjectRepository;

    public SubjectService(BoardRepository boardRepository, SubjectRepository subjectRepository) {
        this.boardRepository = boardRepository;
        this.subjectRepository = subjectRepository;
    }

    public boolean addNewSubject(SubjectRequest request) {
        try {
            Subject subject = request.toEntity(boardRepository.getOne(request.getBoardId()));
            subjectRepository.save(subject);
            return true;
        } catch (Exception e) {
            log.error("addNewSubject Failure", e);
            return false;
        }
    }

    @Transactional
    public boolean modifySubject(Long subjectId, SubjectRequest request) {
        return subjectRepository.findById(subjectId)
                .map(subject -> {
                    subject.setName(request.getName());
                    return true;
                }).orElseGet(() -> false);
    }

    public boolean removeSubject(Long subjectId) {
        return subjectRepository.findById(subjectId)
                .map(subject -> {
                    subjectRepository.delete(subject);
                    return true;
                }).orElseGet(() -> false);
    }

    public List<SubjectResponse> getSubjectsByBoardId(Long boardId) {
        return subjectRepository.findByBoardId(boardId)
                .stream().map(SubjectResponse::of).collect(Collectors.toList());
    }
}
