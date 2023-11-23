package src.main.java.kurdistan.journalapp.model;

import src.main.java.kurdistan.journalapp.db.model.UserDb;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter

public class User {


    private Long id;

    private String username;


    private String password;

    private String role;

    public User(UserDb u) {
        this.id = u.getId();
        this.username = u.getUsername();
        this.password = u.getPassword();
        this.role = u.getRole();
    }

    public User(){
    }

}
