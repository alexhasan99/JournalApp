package kurdistan.journalapp.db.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import kurdistan.journalapp.model.Encounter;
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


    @Column(name = "observation_date")
    private LocalDateTime observationDate;

    @Column(name = "observation_text")
    private String observationText;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "encounter")
    private EncounterDb encounter;

    public static ObservationDb FromObservation(Observation observation) {
        ObservationDb observationDb = new ObservationDb();
        observationDb.setId(observation.getId());
        observationDb.setType(observation.getType());
        observationDb.setObservationText(observation.getObservationText());
        observationDb.setObservationDate(observation.getObservationDate());
        observationDb.setEncounter(EncounterDb.FromEncounter(observation.getEncounter()));
        return observationDb;
    }
}


