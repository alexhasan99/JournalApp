package kurdistan.journalapp.service;

import kurdistan.journalapp.db.model.ConditionDb;
import kurdistan.journalapp.db.model.PatientDb;
import kurdistan.journalapp.db.model.StaffDb;
import kurdistan.journalapp.db.repository.ConditionRepository;
import kurdistan.journalapp.model.Condition;
import kurdistan.journalapp.service.interfaces.IConditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConditionServiceImp implements IConditionService {

    @Autowired
    private ConditionRepository conditionRepository;

    @Override
    public Condition getConditionById(Long id) {

        return Condition.FromConditionDb(conditionRepository.findConditionDbById(id));
    }

    @Override
    public Condition createCondition(Condition condition) {
        ConditionDb conditionDb = ConditionDb.FromCondition(condition);
        ConditionDb savedConditionDb = conditionRepository.save(conditionDb);
        return Condition.FromConditionDb(savedConditionDb);
    }

    @Override
    public List<Condition> getConditionsByPatientId(Long id){
        List<Condition> list = new ArrayList<>();
        for (ConditionDb d: conditionRepository.findConditionDbsByPatientIdOrderByDiagnosisDate(id)) {
            list.add(Condition.FromConditionDb(d));
        }
        return list;
    }

    @Override
    public Condition updateCondition(Long id, Condition updatedCondition) {
        ConditionDb existingCondition = conditionRepository.findConditionDbById(id);

        if (existingCondition != null) {
            List<String> changedAttributes = Condition.FromConditionDb(existingCondition).getChangedAttributes(updatedCondition);

            for (String attribute : changedAttributes) {
                switch (attribute) {
                    case "conditionName" -> existingCondition.setConditionName(updatedCondition.getName());
                    case "patient" -> existingCondition.setPatient(PatientDb.FromPatient(updatedCondition.getPatient()));
                    case "staff" -> existingCondition.setStaff(StaffDb.FromStaff(updatedCondition.getStaff()));
                    case "diagnosisDate" -> existingCondition.setDiagnosisDate(updatedCondition.getDiagnosisDate());
                    case "description" -> existingCondition.setDescription(updatedCondition.getDescription());
                    default -> {
                    }
                    // Om attributet inte matchar något av fallen
                }
            }

            ConditionDb updatedConditionDb = conditionRepository.save(existingCondition);
            return Condition.FromConditionDb(updatedConditionDb);
        }
        return null;
    }

    @Override
    public void deleteCondition(Long id) {
        conditionRepository.deleteById(id);
    }
}
