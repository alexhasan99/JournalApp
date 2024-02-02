package kurdistan.journalapp.db.repository;

import kurdistan.journalapp.db.model.UserDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserDb, Long> {
    UserDb findUserDbByUsername (String userName);
    boolean existsByUsername(String username);

}

