package com.jamongjelly.bbs.domain.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
    @Query("SELECT r FROM Reply r WHERE r.post.id = :postId")
    List<Reply> findByPostIdIn(@Param("postId") Long postId);

    @Query("SELECT r FROM Reply r WHERE r.createdBy = :userId")
    Page<Reply> findByUserId(@Param("userId") Long userId, Pageable pageable);
}
