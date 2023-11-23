package kurdistan.journalapp.db.repository;

import kurdistan.journalapp.db.model.PatientDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<PatientDb, Long> {
    PatientDb findPatientDbById(Long id);
}
