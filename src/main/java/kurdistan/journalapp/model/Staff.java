package kurdistan.journalapp.model;

import kurdistan.journalapp.db.model.StaffDb;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
public class Staff extends Person {


    private String staffType;

    private MyUserDetails myUserDetails;

    public Staff(Long id, String firstName, String lastName,
                 String email, String gender, String staffType, MyUserDetails myUserDetails) {
        super(id, firstName, lastName, email, gender);
        this.staffType = staffType;
        this.myUserDetails = myUserDetails;
    }

    public static Staff FromStaffDb(StaffDb d){
        return new Staff(d.getId(), d.getFirstName(),
                d.getLastName(), d.getEmail(), d.getGender(), d.getStaffType(), new MyUserDetails(d.getUserDb()));
    }

    public List<String> getChangedAttributes(Staff other) {
        List<String> changedAttributes = new ArrayList<>();

        if (!Objects.equals(this.getFirstName(), other.getFirstName()) && other.getFirstName() != null) {
            changedAttributes.add("firstName");
        }
        if (!Objects.equals(this.getLastName(), other.getLastName()) && other.getLastName() != null) {
            changedAttributes.add("lastName");
        }
        if (!Objects.equals(this.getEmail(), other.getEmail()) && other.getEmail() != null) {
            changedAttributes.add("email");
        }
        if (!Objects.equals(this.staffType, other.staffType) && other.getStaffType() != null) {
            changedAttributes.add("staffType");
        }
        if (!Objects.equals(this.getGender(), other.getGender()) && other.getGender() != null) {
            changedAttributes.add("email");
        }
        // Lägg till fler jämförelser för andra attribut

        return changedAttributes;
    }
}
