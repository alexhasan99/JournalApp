package kurdistan.journalapp.db.repository;

import kurdistan.journalapp.db.model.PatientDb;
import kurdistan.journalapp.db.model.UserDb;
import kurdistan.journalapp.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<PatientDb, Long> {
    PatientDb findPatientDbById(Long id);
    PatientDb findPatientDbByUserDb(UserDb userDb);


}
