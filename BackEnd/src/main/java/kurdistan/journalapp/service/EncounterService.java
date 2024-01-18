package kurdistan.journalapp.service;

import kurdistan.journalapp.db.model.ConditionDb;
import kurdistan.journalapp.db.model.EncounterDb;
import kurdistan.journalapp.db.model.PatientDb;
import kurdistan.journalapp.db.model.StaffDb;
import kurdistan.journalapp.db.repository.EncounterRepository;
import kurdistan.journalapp.model.Condition;
import kurdistan.journalapp.model.Encounter;
import kurdistan.journalapp.service.interfaces.IConditionService;
import kurdistan.journalapp.service.interfaces.IEncounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EncounterService implements IEncounterService {

    @Autowired
    private EncounterRepository encounterRepository;


    @Override
    public Encounter getEncounterById(Long id) {
        return Encounter.FromEncounterDb(encounterRepository.getEncounterDbById(id));
    }

    @Override
    public Encounter createEncounter(Encounter encounter) {
        EncounterDb encounterDb = EncounterDb.FromEncounter(encounter);
        EncounterDb savedEncounterDb = encounterRepository.save(encounterDb);
        return Encounter.FromEncounterDb(savedEncounterDb);

    }

    @Override
    public Encounter updateEncounter(Long id, Encounter updatedEncounter) {
        EncounterDb existingEncounter = encounterRepository.getEncounterDbById(id);

        if (existingEncounter != null) {
            List<String> changedAttributes = Encounter.FromEncounterDb(existingEncounter).getChangedAttributes(updatedEncounter);

            for (String attribute : changedAttributes) {
                switch (attribute) {
                    case "encounterDate" -> existingEncounter.setEncounterDate(updatedEncounter.getEncounterDate());
                    case "patient" -> existingEncounter.setPatient(PatientDb.FromPatient(updatedEncounter.getPatient()));
                    case "staff" -> existingEncounter.setStaff(StaffDb.FromStaff(updatedEncounter.getStaff()));
                    case "location" -> existingEncounter.setLocation(updatedEncounter.getLocation());
                    case "note" -> existingEncounter.setNote(updatedEncounter.getNote());
                    // Lägg till fler fall för andra attribut

                    default -> {
                        // Om attributet inte matchar något av fallen
                    }
                }
            }

            EncounterDb updatedEncounterDb = encounterRepository.save(existingEncounter);
            return Encounter.FromEncounterDb(updatedEncounterDb);
        }
        return null;
    }

    @Override
    public List<Encounter> getEncounterByPatientId(Long id) {
        List<Encounter> list = new ArrayList<>();
        for (EncounterDb d: encounterRepository.getEncounterDbsByPatientId(id)) {
            list.add(Encounter.FromEncounterDb(d));
        }
        return list;
    }
}
