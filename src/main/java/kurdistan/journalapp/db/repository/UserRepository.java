package kurdistan.journalapp.db.repository;

import kurdistan.journalapp.db.model.UserDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserDb, Long> {
    // Här kan du lägga till anpassade frågor om det behövs
}

