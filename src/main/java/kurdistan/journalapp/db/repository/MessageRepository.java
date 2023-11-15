package kurdistan.journalapp.db.repository;

import kurdistan.journalapp.db.model.MessageDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<MessageDb, Long> {
}
