package kurdistan.journalapp.db.model;

import jakarta.persistence.*;
import kurdistan.journalapp.model.Staff;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Entity
@Table(name = "Staff")
public class StaffDb {
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

    @Column(name = "staff_type")
    private String staffType;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id", nullable = false)
    private UserDb userDb;

    public static StaffDb FromStaff(Staff p){
        StaffDb d= new StaffDb();
        d.setId(p.getId());
        d.setFirstName(p.getFirstname());
        d.setLastName(p.getLastname());
        d.setEmail(p.getEmail());
        d.setGender(p.getGender());
        d.setStaffType(p.getStaffType());
        d.setUserDb(UserDb.FromUser(p.getUser()));
        return d;
    }
}

