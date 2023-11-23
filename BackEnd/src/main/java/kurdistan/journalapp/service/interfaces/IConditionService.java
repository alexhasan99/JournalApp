package kurdistan.journalapp.service.interfaces;

import kurdistan.journalapp.model.Condition;
import kurdistan.journalapp.model.Patient;

import java.util.List;

public interface IConditionService {
    Condition getConditionById(Long id);
    Condition createCondition(Condition condition);

    Condition updateCondition(Long id, Condition condition);

    void deleteCondition(Long id);
    List<Condition> getConditionsByPatientId(Long id);
}
