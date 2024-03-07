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

    private String observationText;

    private LocalDateTime observationDate; // Datum då observationen gjordes

    private Encounter encounter;

    public Observation(Long id, String type, String observationText,
                       LocalDateTime observationDate, Encounter encounter) {
        this.id = id;
        this.type = type;
        this.observationText = observationText;
        this.observationDate = observationDate;
        this.encounter = encounter;
    }

    public static Observation FromObservationDb(ObservationDb observationDb) {
        return new Observation(
                observationDb.getId(),
                observationDb.getType(),
                observationDb.getObservationText(),
                observationDb.getObservationDate(),
                Encounter.FromEncounterDb(observationDb.getEncounter())

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
        if (!Objects.equals(this.getObservationDate(), other.getObservationDate()) && other.getObservationDate() != null) {
            changedAttributes.add("observationDate");
        }

        return changedAttributes;
    }


}
