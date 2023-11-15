package kurdistan.journalapp.model;

import jakarta.persistence.Column;
import kurdistan.journalapp.db.model.UserDb;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class User {


    private Long id;

    private String username;


    private String password;

    private String role;

    public User(Long id, String username, String password, String role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public User(){
    }

    public static User FromUserDb(UserDb u){
        return new User(u.getId(),u.getUsername(),u.getPassword(), u.getRole());
    }
}
