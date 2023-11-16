package kurdistan.journalapp.service.interfaces;

import kurdistan.journalapp.model.User;

public interface IUserService{

    User createUser(User user);
    User login(String username, String password);
    User getUserById(Long id);

    User updateUser(Long id, User updatedUser);
}
