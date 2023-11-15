package kurdistan.journalapp.db.repository;

import kurdistan.journalapp.db.model.ObservationDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ObservationRepository extends JpaRepository<ObservationDb, Long> {
    // Här kan du lägga till anpassade frågor om det behövs
}