package src.main.java.kurdistan.journalapp.service.interfaces;

import src.main.java.kurdistan.journalapp.model.Condition;
import src.main.java.kurdistan.journalapp.model.Patient;

import java.util.List;

public interface IConditionService {
    Condition getConditionById(Long id);
    Condition createCondition(Condition condition);

    Condition updateCondition(Long id, Condition condition);

    void deleteCondition(Long id);
    List<Condition> getConditionsByPatientId(Long id);
}
