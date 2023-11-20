package kurdistan.journalapp.db.repository;

import kurdistan.journalapp.db.model.EncounterDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EncounterRepository extends JpaRepository<EncounterDb, Long> {

    EncounterDb getEncounterDbById(Long id);
    List<EncounterDb> getEncounterDbsByPatientId(Long id);

}
