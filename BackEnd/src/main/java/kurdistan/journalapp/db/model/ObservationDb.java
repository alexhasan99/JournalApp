package kurdistan.journalapp.db.model;

import jakarta.persistence.Id;
import jakarta.persistence.*;
import kurdistan.journalapp.model.Observation;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter

@Entity
@Table(name = "observation")
public class ObservationDb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "observation_id")
    private Long id;

    @Column(name = "observation_type")
    private String type;

    @ManyToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "id")
    private PatientDb patient;

    @ManyToOne
    @JoinColumn(name = "staff_id", referencedColumnName = "id")
    private StaffDb staff;

    @Column(name = "observation_date")
    private LocalDateTime observationDate;

    @Column(name = "observation_text")
    private String observationText;

    public static ObservationDb FromObservation(Observation observation) {
        ObservationDb observationDb = new ObservationDb();
        observationDb.setId(observation.getId());
        observationDb.setType(observation.getType());
        observationDb.setObservationText(observation.getObservationText());
        observationDb.setObservationDate(observation.getObservationDate());
        observationDb.setPatient(PatientDb.FromPatient(observation.getPatient()));
        observationDb.setStaff(StaffDb.FromStaff(observation.getStaff()));
        return observationDb;
    }
}


