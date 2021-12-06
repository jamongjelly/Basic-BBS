package com.jamongjelly.bbs.domain.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    @Query("SELECT t FROM Todo t WHERE t.createdBy = :userId")
    List<Todo> findByUserIdIn(@Param("userId") Long userId);

    void deleteByCreatedBy(Long createdBy);
}
