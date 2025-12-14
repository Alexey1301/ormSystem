package com.reputation.repository;

import com.reputation.model.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResponseRepository extends JpaRepository<Response, Long> {
    List<Response> findByTaskId(Long taskId);
    List<Response> findByReviewId(Long reviewId);
    List<Response> findByUserId(Long userId);
    Optional<Response> findByTaskIdAndIsPublishedTrue(Long taskId);
}

