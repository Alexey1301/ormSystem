package com.reputation.repository;

import com.reputation.model.Source;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SourceRepository extends JpaRepository<Source, Long> {
    List<Source> findByCompanyId(Long companyId);
    List<Source> findByIsActiveTrue();
    List<Source> findByCompanyIdAndIsActiveTrue(Long companyId);
}

