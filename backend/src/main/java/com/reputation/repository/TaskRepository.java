package com.reputation.repository;

import com.reputation.model.Task;
import com.reputation.model.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignedToId(Long userId);
    List<Task> findByStatus(TaskStatus status);
    List<Task> findByAssignedToIdAndStatus(Long userId, TaskStatus status);
    List<Task> findByReviewId(Long reviewId);
}

