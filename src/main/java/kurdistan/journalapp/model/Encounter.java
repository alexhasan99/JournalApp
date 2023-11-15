package kurdistan.journalapp.model;

import kurdistan.journalapp.db.model.EncounterDb;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
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

        Encounter encounter = new Encounter(
                encounterDb.getId(),
                encounterDb.getEncounterDate(),
                patient,
                staff,
                encounterDb.getLocation(),
                encounterDb.getNote()
        );

        return encounter;
    }
}
