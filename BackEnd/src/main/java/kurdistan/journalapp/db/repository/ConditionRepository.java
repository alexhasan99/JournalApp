package src.main.java.kurdistan.journalapp.db.repository;

import src.main.java.kurdistan.journalapp.db.model.ConditionDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConditionRepository extends JpaRepository<ConditionDb, Long> {
    ConditionDb findConditionDbById(Long id);
    List<ConditionDb> findConditionDbsByPatientIdOrderByDiagnosisDate(Long id);
}

