package kurdistan.journalapp.db.model;

import kurdistan.journalapp.model.Patient;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Getter
@Setter

@Entity
@Table(name = "patient")
public class PatientDb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "gender")
    private String gender;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id", nullable = false)
    private UserDb userDb;

    public static PatientDb FromPatient(Patient p){
        PatientDb d= new PatientDb();
        d.setId(p.getId());
        d.setFirstName(p.getFirstname());
        d.setLastName(p.getLastname());
        d.setEmail(p.getEmail());
        d.setGender(p.getGender());
        d.setUserDb(UserDb.FromUser(p.getUser()));
        return d;
    }
}

