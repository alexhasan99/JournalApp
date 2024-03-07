package kurdistan.journalapp.model;

import kurdistan.journalapp.db.model.EncounterDb;
import kurdistan.journalapp.db.model.ObservationDb;
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

    private Long patientId;

    private Long staffId;

    private String location; // Plats för mötet

    private List<ObservationDb> observations;

    public Encounter(Long id, LocalDateTime encounterDate,
                     Long patientId, Long staffId, String location, List<ObservationDb> observations) {
        this.id = id;
        this.encounterDate = encounterDate;
        this.patientId = patientId;
        this.staffId = staffId;
        this.location = location;
        this.observations = observations;
    }

    public static Encounter FromEncounterDb(EncounterDb encounterDb) {

        return new Encounter(
                encounterDb.getId(),
                encounterDb.getEncounterDate(),
                encounterDb.getPatientId(),
                encounterDb.getStaffId(),
                encounterDb.getLocation(),
                encounterDb.getObservations()
        );
    }


    public  List<String> getChangedAttributes(Encounter other) {
        List<String> changedAttributes = new ArrayList<>();

        if (!Objects.equals(this.getEncounterDate(), other.getEncounterDate()) && other.getEncounterDate() != null) {
            changedAttributes.add("encounterDate");
        }
        if (!Objects.equals(this.getPatientId(), other.getPatientId()) && other.getPatientId() != null) {
            changedAttributes.add("patient");
        }
        if (!Objects.equals(this.getStaffId(), other.getStaffId()) && other.getStaffId() != null) {
            changedAttributes.add("staff");
        }
        if (!Objects.equals(this.getLocation(), other.getLocation()) && other.getLocation() != null) {
            changedAttributes.add("location");
        }
        // Lägg till fler jämförelser för andra attribut

        return changedAttributes;
    }
}
