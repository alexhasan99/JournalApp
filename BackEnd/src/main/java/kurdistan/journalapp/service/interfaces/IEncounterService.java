package src.main.java.kurdistan.journalapp.service.interfaces;

import src.main.java.kurdistan.journalapp.model.Encounter;

import java.util.List;

public interface IEncounterService {
    Encounter getEncounterById(Long id);

    Encounter createEncounter(Encounter encounter);

    Encounter updateEncounter(Long id, Encounter encounter);

    List<Encounter> getEncounterByPatientId(Long id);


}
