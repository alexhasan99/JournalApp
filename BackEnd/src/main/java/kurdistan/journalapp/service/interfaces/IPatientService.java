package kurdistan.journalapp.service.interfaces;

import kurdistan.journalapp.model.Patient;

public interface IPatientService {
    Patient getPatientById(Long id);
    Patient createPatient(Patient patient);

    Patient updatePatient(Long id, Patient patient);

    Patient getPatientByEmail(String email);

    Patient get

    Boolean deletePatient(Long id);
}
