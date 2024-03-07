package kurdistan.journalapp.db.repository;

import kurdistan.journalapp.db.model.StaffDb;
import kurdistan.journalapp.db.model.UserDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<StaffDb, Long> {
    StaffDb getDoctorDbById(Long id);

    StaffDb save(StaffDb staffDb);

    List<StaffDb> findAll();

    StaffDb getStaffDbByUserDb(UserDb userDb);

    StaffDb findDoctorDbById(Long id);

}
