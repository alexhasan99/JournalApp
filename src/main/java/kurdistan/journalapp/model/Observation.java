package kurdistan.journalapp.model;

import lombok.Getter;

import java.time.LocalDateTime;

public class Observation {
    @Getter
    private Long id;
    @Getter
    private String type; // Typ av observation (till exempel blodtryck, hjärtslag)

    @Getter
    private Patient patient;
    @Getter
    private String result; // Resultatet av observationen
    @Getter
    private LocalDateTime observationDate; // Datum då observationen gjordes

    public Observation(Long id, String type, String result,
                       LocalDateTime observationDate, Patient patient) {
        this.id = id;
        this.type = type;
        this.result = result;
        this.observationDate = observationDate;
        this.patient= patient;
    }
}
