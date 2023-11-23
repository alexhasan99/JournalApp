package src.main.java.kurdistan.journalapp.service;

import src.main.java.kurdistan.journalapp.db.model.PatientDb;
import src.main.java.kurdistan.journalapp.db.model.UserDb;
import src.main.java.kurdistan.journalapp.db.repository.PatientRepository;
import src.main.java.kurdistan.journalapp.db.repository.UserRepository;
import src.main.java.kurdistan.journalapp.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.main.java.kurdistan.journalapp.service.interfaces.IPatientService;
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
        String generatedUsername = generateUniqueUsername(patient.getFirstName(), patient.getLastName());
        patient.getUser().setUsername(generatedUsername);
        patient.getUser().setRole("patient");
        UserDb u = userRepository.save(UserDb.FromUser(patient.getUser()));
        patient.getUser().setId(u.getId());
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

    private String generateUniqueUsername(String firstName, String lastName) {
        // Combine the first name and last name to generate a username
        String baseUsername = (firstName + "." + lastName).toLowerCase();

        // Check if the generated username already exists, if yes, append a number until it's unique
        String username = baseUsername;
        int count = 1;
        while (userRepository.existsByUsername(username)) {
            username = baseUsername + count;
            count++;
        }

        return username;
    }
}
