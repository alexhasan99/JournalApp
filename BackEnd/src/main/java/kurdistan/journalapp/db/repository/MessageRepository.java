package kurdistan.journalapp.db.repository;

import kurdistan.journalapp.db.model.MessageDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageDb, Long> {
    MessageDb getMassageDbById(long id);
    List<MessageDb> getMassageDbsByReceiverId (long id);

    List<MessageDb> getMassageDbsBySenderId (long id);

    List<MessageDb> getMessageDbBySenderIdAndReceiverId(long sender, long receiver);
}
