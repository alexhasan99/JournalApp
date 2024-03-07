package kurdistan.journalapp.db.model;

import jakarta.persistence.*;
import kurdistan.journalapp.model.Encounter;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter

@Entity
@Table(name = "encounter")
public class EncounterDb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "encounter_id")
    private Long id;


    @Column(name = "patient_id")
    private Long patientId;

    @Column(name = "staff_id")
    private Long staffId;

    @Column(name = "encounter_date")
    private LocalDateTime encounterDate;


    @Column(name = "location")
    private String location;

    @OneToMany(mappedBy = "encounter", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ObservationDb> observations;

    public static EncounterDb FromEncounter(Encounter encounter) {
        EncounterDb encounterDb = new EncounterDb();
        encounterDb.setId(encounter.getId());
        encounterDb.setEncounterDate(encounter.getEncounterDate());
        encounterDb.setPatientId(encounter.getPatientId());
        encounterDb.setStaffId(encounter.getStaffId());
        encounterDb.setLocation(encounter.getLocation());
        encounterDb.setObservations(encounter.getObservations());
        return encounterDb;
    }

}

