package kurdistan.journalapp.service.interfaces;

import kurdistan.journalapp.model.Patient;

public interface IPatientService {
    Patient getPatientById(Long id);
    Patient createPatient(Patient patient);

    Patient updatePatient(Long id, Patient patient);

    Boolean deletePatient(Long id);
}
