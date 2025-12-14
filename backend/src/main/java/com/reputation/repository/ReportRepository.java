package com.reputation.repository;

import com.reputation.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByCompanyId(Long companyId);
    List<Report> findByCreatedById(Long userId);
    List<Report> findByCompanyIdAndCreatedById(Long companyId, Long userId);
}

