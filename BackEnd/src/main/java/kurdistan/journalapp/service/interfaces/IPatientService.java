package kurdistan.journalapp.service.interfaces;

import kurdistan.journalapp.model.Patient;

import java.util.List;

public interface IPatientService {
    Patient getPatientById(Long id);
    Patient createPatient(Patient patient);

    Patient updatePatient(Long id, Patient patient);

    Patient getPatientByEmail(String email);

    List<Patient> getAllPatients();

    Patient getPatientByUserId(Long id);

    Boolean deletePatient(Long id);
}
