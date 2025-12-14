package com.reputation.repository;

import com.reputation.model.Review;
import com.reputation.model.SentimentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findBySourceId(Long sourceId);
    List<Review> findBySourceCompanyId(Long companyId);
    List<Review> findBySentiment(SentimentType sentiment);
    Optional<Review> findBySourceIdAndExternalId(Long sourceId, String externalId);
    
    @Query("SELECT r FROM Review r WHERE r.source.company.id = :companyId AND r.collectedAt BETWEEN :startDate AND :endDate")
    List<Review> findByCompanyIdAndDateRange(@Param("companyId") Long companyId, 
                                              @Param("startDate") LocalDateTime startDate, 
                                              @Param("endDate") LocalDateTime endDate);
}

