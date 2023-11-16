package kurdistan.journalapp.model;

import kurdistan.journalapp.db.model.ObservationDb;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter

public class Observation {

    private Long id;

    private String type;


    private Patient patient;


    private Staff staff;

    private String observationText;

    private LocalDateTime observationDate; // Datum då observationen gjordes

    public Observation(Long id, String type, String observationText,
                       LocalDateTime observationDate, Patient patient, Staff staff) {
        this.id = id;
        this.type = type;
        this.observationText = observationText;
        this.observationDate = observationDate;
        this.patient= patient;
        this.staff = staff;
    }

    public static Observation FromObservationDb(ObservationDb observationDb) {
        return new Observation(
                observationDb.getId(),
                observationDb.getType(),
                observationDb.getObservationText(),
                observationDb.getObservationDate(),
                Patient.FromPatientDb(observationDb.getPatient()),
                Staff.FromStaffDb(observationDb.getStaff())
        );
    }

    public List<String> getChangedAttributes(Observation other) {
        List<String> changedAttributes = new ArrayList<>();

        if (!Objects.equals(this.getType(), other.getType()) && other.getType() != null) {
            changedAttributes.add("type");
        }
        if (!Objects.equals(this.getObservationText(), other.getObservationText()) && other.getObservationText() != null) {
            changedAttributes.add("observationText");
        }
        if (!Objects.equals(this.getPatient(), other.getPatient()) && other.getPatient() != null) {
            changedAttributes.add("patient");
        }
        if (!Objects.equals(this.getStaff(), other.getStaff()) && other.getStaff() != null) {
            changedAttributes.add("staff");
        }
        if (!Objects.equals(this.getObservationDate(), other.getObservationDate()) && other.getObservationDate() != null) {
            changedAttributes.add("observationDate");
        }

        return changedAttributes;
    }


}
