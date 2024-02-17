package kurdistan.journalapp.db.repository;

import kurdistan.journalapp.db.model.ImageDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ImageRepository extends JpaRepository<ImageDb, Long> {
    ImageDb getImageDbById(Long id);

    List<ImageDb> getImageDbsByPatientId(Long id);
}
