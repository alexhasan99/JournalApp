package kurdistan.journalapp.db.model;

import jakarta.persistence.*;
import kurdistan.journalapp.model.Encounter;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter

@Entity
@Table(name = "encounter")
public class EncounterDb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "encounter_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "id")
    private PatientDb patient;

    @ManyToOne
    @JoinColumn(name = "staff_id", referencedColumnName = "id")
    private StaffDb staff;

    @Column(name = "encounter_date")
    private LocalDateTime encounterDate;

    @Column(name = "note")
    private String note;

    @Column(name = "location")
    private String location;

    public static EncounterDb FromEncounter(Encounter encounter) {
        EncounterDb encounterDb = new EncounterDb();
        encounterDb.setId(encounter.getId());
        encounterDb.setEncounterDate(encounter.getEncounterDate());
        encounterDb.setPatient(PatientDb.FromPatient(encounter.getPatient()));
        encounterDb.setStaff(StaffDb.FromStaff(encounter.getStaff()));
        encounterDb.setLocation(encounter.getLocation());
        encounterDb.setNote(encounter.getNote());
        return encounterDb;
    }

}

