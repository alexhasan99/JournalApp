package kurdistan.journalapp.service.interfaces;

import kurdistan.journalapp.model.Encounter;

import java.util.List;

public interface IEncounterService {
    Encounter getEncounterById(Long id);

    Encounter createEncounter(Encounter encounter);

    Encounter updateEncounter(Long id, Encounter encounter);

    List<Encounter> getEncounterByPatientId(Long id);


}
