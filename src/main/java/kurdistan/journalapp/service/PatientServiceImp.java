package kurdistan.journalapp.service;

import kurdistan.journalapp.db.model.PatientDb;
import kurdistan.journalapp.db.model.UserDb;
import kurdistan.journalapp.db.repository.PatientRepository;
import kurdistan.journalapp.db.repository.UserRepository;
import kurdistan.journalapp.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kurdistan.journalapp.service.interfaces.IPatientService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PatientServiceImp implements IPatientService {
    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Patient getPatientById(Long id) {
        return Patient.FromPatientDb(patientRepository.findPatientDbById(id));
    }

    @Override
    public Patient createPatient(Patient patient) {
        UserDb u = userRepository.save(UserDb.FromUser(patient.getMyUserDetails()));
        patient.getMyUserDetails().setId(u.getId());
        Patient p = Patient.FromPatientDb(patientRepository.save(PatientDb.FromPatient(patient)));
        return p;
    }

    @Override
    public Patient updatePatient(Long id, Patient updatedPatient) {
        PatientDb existingPatient = patientRepository.findPatientDbById(id);

        if (existingPatient != null) {
            List<String> changedAttributes = Patient.FromPatientDb(existingPatient).getChangedAttributes(updatedPatient);

            for (String attribute : changedAttributes) {
                switch (attribute) {
                    case "firstName" -> existingPatient.setFirstName(updatedPatient.getFirstName());
                    case "lastName" -> existingPatient.setLastName(updatedPatient.getLastName());
                    case "email" -> existingPatient.setEmail(updatedPatient.getEmail());
                    case "gender" -> existingPatient.setGender(updatedPatient.getGender());
                    default -> {
                    }
                }
            }

            PatientDb updatedPatientDb = patientRepository.save(existingPatient);
            return Patient.FromPatientDb(updatedPatientDb);
        }
        return null;
    }


    @Override
    @Transactional
    public Boolean deletePatient(Long id) {
        patientRepository.deleteById(id);
        return true;
    }
}
