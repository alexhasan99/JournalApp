package kurdistan.journalapp.service;

import kurdistan.journalapp.db.model.UserDb;
import kurdistan.journalapp.db.repository.UserRepository;
import kurdistan.journalapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user){
        UserDb userDb = UserDb.FromUser(user);
        UserDb savedUserDb = userRepository.save(userDb);
        return new  User(savedUserDb);
    }

    public User login(String username, String password) {
        UserDb userDb = userRepository.findUserDbByUsername(username);

        if (userDb != null && userDb.getPassword().equals(password)) {
            return new User(userDb);
        }

        return null; // Återge null om användaruppgifterna inte matchar
    }

    public User getUserById(Long id) {
        UserDb userDb = userRepository.findById(id).orElse(null);
        return userDb != null ? new User(userDb) : null;
    }

    public User getUserByUserName(String username){
        return new User(userRepository.findUserDbByUsername(username));
    }

    public User updateUser(Long id, User updatedUser) {
        UserDb existingUser = userRepository.findById(id).orElse(null);

        if (existingUser != null) {

            existingUser.setPassword(updatedUser.getPassword());

            UserDb updatedUserDb = userRepository.save(existingUser);
            return new User(updatedUserDb);
        }
        return null;
    }



}
