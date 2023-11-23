package kurdistan.journalapp.service.interfaces;

import kurdistan.journalapp.model.Observation;

import java.util.List;

public interface IObservationService {
    Observation getObservationById(Long id);
    Observation updateObservation(Long id, Observation updatedObservation);
    Observation createObservation(Observation observation);
    void deleteObservation(Long id);

    List<Observation> getObservationsByPatientId(Long id);

}
