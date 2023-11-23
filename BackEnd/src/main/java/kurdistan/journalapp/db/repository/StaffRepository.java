package src.main.java.kurdistan.journalapp.db.repository;

import src.main.java.kurdistan.journalapp.db.model.StaffDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<StaffDb, Long> {
    StaffDb getDoctorDbById(Long id);

    StaffDb save(StaffDb staffDb);

    List<StaffDb> findAll();

    StaffDb findDoctorDbById(Long id);

}
