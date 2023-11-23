package kurdistan.journalapp.db.repository;

import kurdistan.journalapp.db.model.ObservationDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ObservationRepository extends JpaRepository<ObservationDb, Long> {
    ObservationDb getObservationDbById(Long id);
    List<ObservationDb> getObservationDbsByPatientId(Long id);
}