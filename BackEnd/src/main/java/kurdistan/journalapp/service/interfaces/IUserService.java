package src.main.java.kurdistan.journalapp.service.interfaces;


import src.main.java.kurdistan.journalapp.model.User;

public interface IUserService{
    User loadUserByUsername(String username);
}
