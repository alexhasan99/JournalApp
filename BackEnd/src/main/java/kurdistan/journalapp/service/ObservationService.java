package src.main.java.kurdistan.journalapp.service;

import src.main.java.kurdistan.journalapp.db.model.ObservationDb;
import src.main.java.kurdistan.journalapp.db.model.PatientDb;
import src.main.java.kurdistan.journalapp.db.model.StaffDb;
import src.main.java.kurdistan.journalapp.db.repository.ObservationRepository;

import src.main.java.kurdistan.journalapp.model.Observation;
import src.main.java.kurdistan.journalapp.service.interfaces.IObservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ObservationService implements IObservationService {

    @Autowired
    private ObservationRepository observationRepository;

    public Observation getObservationById(Long id) {
        return Observation.FromObservationDb(observationRepository.getObservationDbById(id));
    }


    public Observation updateObservation(Long id, Observation updatedObservation) {
        ObservationDb existingObservation = observationRepository.getObservationDbById(id);

        if (existingObservation != null) {
            List<String> changedAttributes = Observation.FromObservationDb(existingObservation)
                    .getChangedAttributes(updatedObservation);

            for (String attribute : changedAttributes) {
                switch (attribute) {
                    case "type" -> existingObservation.setType(updatedObservation.getType());
                    case "observationText" -> existingObservation.setObservationText(updatedObservation.getObservationText());
                    case "patient" -> existingObservation.setPatient(PatientDb.FromPatient(updatedObservation.getPatient()));
                    case "staff" -> existingObservation.setStaff(StaffDb.FromStaff(updatedObservation.getStaff()));
                    case "observationDate" -> existingObservation.setObservationDate(updatedObservation.getObservationDate());
                    // Lägg till fler fall för andra attribut
                    default -> {
                        // Om attributet inte matchar något av fallen
                    }
                }
            }
            ObservationDb updatedObservationDb = observationRepository.save(existingObservation);
            return Observation.FromObservationDb(updatedObservationDb);
        }
        return null;
    }

    public Observation createObservation(Observation observation){
        ObservationDb obsDb = ObservationDb.FromObservation(observation);
        ObservationDb savedObservationDb = observationRepository.save(obsDb);
        return Observation.FromObservationDb(savedObservationDb);
    }

    public void deleteObservation(Long id){
        observationRepository.deleteById(id);
    }

    public List<Observation> getObservationsByPatientId(Long id){
        List<Observation> list = new ArrayList<>();
        for (ObservationDb d: observationRepository.getObservationDbsByPatientId(id))
        {
            list.add(Observation.FromObservationDb(d));
        }
        return list;
    }

}
