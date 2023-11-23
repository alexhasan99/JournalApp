package kurdistan.journalapp.service.interfaces;


import kurdistan.journalapp.model.User;

public interface IUserService{
    User loadUserByUsername(String username);
}
