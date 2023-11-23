package kurdistan.journalapp.model;

import kurdistan.journalapp.db.model.PatientDb;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Patient extends Person{

    @Getter @Setter
    private User user;

    public Patient(Long id, String firstName, String lastName,
                   String email, String gender, User user) {
        super(id, firstName, lastName, email, gender);
        this.user = user;
    }


    public static Patient FromPatientDb(PatientDb p){
        return new Patient(p.getId(), p.getFirstName(), p.getLastName(), p.getEmail(),
                p.getGender(), new User(p.getUserDb()));
    }

    public List<String> getChangedAttributes(Patient other) {
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
        if (!Objects.equals(this.getGender(), other.getGender()) && other.getGender() != null) {
            changedAttributes.add("gender");
        }

        return changedAttributes;
    }

}
