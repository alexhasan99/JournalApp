package kurdistan.journalapp.model;

import kurdistan.journalapp.db.model.EncounterDb;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter

public class Encounter {

    private Long id;

    private LocalDateTime encounterDate; // Datum för mötet


    private Patient patient;

    private Staff staff;

    private String location; // Plats för mötet

    private String note; // Beskrivning av mötet

    public Encounter(Long id, LocalDateTime encounterDate,
                     Patient patient, Staff staff, String location, String note) {
        this.id = id;
        this.encounterDate = encounterDate;
        this.patient = patient;
        this.staff = staff;
        this.location = location;
        this.note = note;
    }

    public static Encounter FromEncounterDb(EncounterDb encounterDb) {
        Patient patient = Patient.FromPatientDb(encounterDb.getPatient());
        Staff staff = Staff.FromStaffDb(encounterDb.getStaff());

        return new Encounter(
                encounterDb.getId(),
                encounterDb.getEncounterDate(),
                patient,
                staff,
                encounterDb.getLocation(),
                encounterDb.getNote()
        );
    }

    public  List<String> getChangedAttributes(Encounter other) {
        List<String> changedAttributes = new ArrayList<>();

        if (!Objects.equals(this.getEncounterDate(), other.getEncounterDate()) && other.getEncounterDate() != null) {
            changedAttributes.add("encounterDate");
        }
        if (!Objects.equals(this.getPatient(), other.getPatient()) && other.getPatient() != null) {
            changedAttributes.add("patient");
        }
        if (!Objects.equals(this.getStaff(), other.getStaff()) && other.getStaff() != null) {
            changedAttributes.add("staff");
        }
        if (!Objects.equals(this.getLocation(), other.getLocation()) && other.getLocation() != null) {
            changedAttributes.add("location");
        }
        if (!Objects.equals(this.getNote(), other.getNote()) && other.getNote() != null) {
            changedAttributes.add("note");
        }
        // Lägg till fler jämförelser för andra attribut

        return changedAttributes;
    }
}
