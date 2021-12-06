package com.jamongjelly.bbs.domain.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {
    List<Post> findAll(Specification<Post> spec);

    Page<Post> findByBoardId(Long boardId, Pageable pageable);
    Page<Post> findAll(Specification<Post> spec, Pageable pageable);
    Page<Post> findByCreatedBy(Long createdBy, Pageable pageable);
}
