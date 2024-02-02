package kurdistan.journalapp.model;

import kurdistan.journalapp.db.model.UserDb;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter

public class User {


    private Long id;

    private String email;
    private String password;

    private String role;

    public User(UserDb u) {
        this.id = u.getId();
        this.email = u.getUsername();
        this.password = u.getPassword();
        this.role = u.getRole();
    }

    public User(){
    }

}
