package kurdistan.journalapp.model;

import kurdistan.journalapp.db.model.ConditionDb;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter

public class Condition {

    private Long id;

    private String name;

    private Patient patient;

    private Staff staff;


    private String description; // Beskrivning av tillståndet eller åkomman


    private LocalDateTime diagnosisDate; // Datum då tillståndet ställdes
    // Eventuellt ytterligare attribut beroende på behov


    public Condition( Long id, String name, String description,
                     LocalDateTime diagnosisDate, Patient patient, Staff staff) {
        this.name = name;
        this.description = description;
        this.diagnosisDate = diagnosisDate;
        this.patient = patient;
        this.staff = staff;
        this.id= id;
    }

    public static Condition FromConditionDb(ConditionDb conditionDb) {
        return new Condition(
                conditionDb.getId(),
                conditionDb.getConditionName(),
                conditionDb.getDescription(),
                conditionDb.getDiagnosisDate(),
                Patient.FromPatientDb(conditionDb.getPatient()),
                Staff.FromStaffDb(conditionDb.getStaff())
        );
    }

    public List<String> getChangedAttributes(Condition other) {
        List<String> changedAttributes = new ArrayList<>();

        if (!Objects.equals(this.getName(), other.getName()) && other.getName() != null) {
            changedAttributes.add("conditionName");
        }
        if (!Objects.equals(this.getPatient(), other.getPatient()) && other.getPatient() != null) {
            changedAttributes.add("patient");
        }
        if (!Objects.equals(this.getStaff(), other.getStaff()) && other.getStaff() != null) {
            changedAttributes.add("staff");
        }
        if (!Objects.equals(this.getDiagnosisDate(), other.getDiagnosisDate()) && other.getDiagnosisDate() != null) {
            changedAttributes.add("diagnosisDate");
        }
        if (!Objects.equals(this.getDescription(), other.getDescription()) && other.getDescription() != null) {
            changedAttributes.add("description");
        }
        // Lägg till fler jämförelser för andra attribut

        return changedAttributes;
    }

}
