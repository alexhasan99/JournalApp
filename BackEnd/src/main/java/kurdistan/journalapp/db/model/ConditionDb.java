package src.main.java.kurdistan.journalapp.db.model;

import jakarta.persistence.*;
import src.main.java.kurdistan.journalapp.model.Condition;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter

@Entity
@Table(name = "health_condition")
public class ConditionDb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "condition_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "id")
    private PatientDb patient;

    @ManyToOne
    @JoinColumn(name = "staff_id", referencedColumnName = "id")
    private StaffDb staff;

    @Column(name = "condition_name")
    private String conditionName;

    @Column(name = "diagnosis_date")
    private LocalDateTime diagnosisDate;

    @Column(name = "description")
    private String description;


    public static ConditionDb FromCondition(Condition condition) {
        ConditionDb conditionDb = new ConditionDb();
        conditionDb.setConditionName(condition.getName());
        conditionDb.setDescription(condition.getDescription());
        conditionDb.setDiagnosisDate(condition.getDiagnosisDate());
        conditionDb.setPatient(PatientDb.FromPatient(condition.getPatient()));
        conditionDb.setStaff(StaffDb.FromStaff(condition.getStaff()));
        return conditionDb;
    }

}

