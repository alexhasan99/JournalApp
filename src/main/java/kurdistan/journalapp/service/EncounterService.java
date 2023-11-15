package kurdistan.journalapp.service;

import kurdistan.journalapp.db.model.ConditionDb;
import kurdistan.journalapp.db.model.EncounterDb;
import kurdistan.journalapp.db.repository.EncounterRepository;
import kurdistan.journalapp.model.Condition;
import kurdistan.journalapp.model.Encounter;
import kurdistan.journalapp.service.interfaces.IConditionService;
import kurdistan.journalapp.service.interfaces.IEncounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EncounterService implements IEncounterService {

    @Autowired
    private EncounterRepository encounterRepository;


    @Override
    public Encounter getEncounterById(Long id) {
        return null;
    }

    @Override
    public Encounter createEncounter(Encounter encounter) {
        EncounterDb encounterDb = EncounterDb.FromEncounter(encounter);
        EncounterDb savedEncounterDb = encounterRepository.save(encounterDb);
        return Encounter.FromEncounterDb(savedEncounterDb);

    }

    @Override
    public Encounter updateEncounter(Long id, Encounter encounter) {
        return null;
    }

    @Override
    public List<Encounter> getEncounterByPatientId(Long id) {
        return null;
    }
}
