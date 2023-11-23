package src.main.java.kurdistan.journalapp.service.interfaces;

import src.main.java.kurdistan.journalapp.model.Patient;

public interface IPatientService {
    Patient getPatientById(Long id);
    Patient createPatient(Patient patient);

    Patient updatePatient(Long id, Patient patient);

    Boolean deletePatient(Long id);
}
