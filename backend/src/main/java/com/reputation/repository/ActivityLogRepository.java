package com.reputation.repository;

import com.reputation.model.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog> findBySpecialistId(Long specialistId);
    List<ActivityLog> findByTaskId(Long taskId);
    List<ActivityLog> findBySpecialistIdAndTaskId(Long specialistId, Long taskId);
}

