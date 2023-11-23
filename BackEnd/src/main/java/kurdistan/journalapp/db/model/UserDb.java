package kurdistan.journalapp.db.model;

import jakarta.persistence.*;
import kurdistan.journalapp.model.User;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter

@Entity
@Table(name = "user")
public class UserDb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role", nullable = false)
    private String role; // Exempelvis "patient", "doctor", "other_staff"

    public static UserDb FromUser(User u){
        if(u == null)
           return new UserDb();

        UserDb d= new UserDb();
        d.setId(u.getId());
        d.setUsername(u.getUsername());
        d.setPassword(u.getPassword());
        d.setRole(u.getRole());
        return d;
    }
}

