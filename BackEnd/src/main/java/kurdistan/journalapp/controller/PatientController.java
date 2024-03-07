package kurdistan.journalapp.controller;

import kurdistan.journalapp.db.model.PatientDb;
import kurdistan.journalapp.model.Patient;
import kurdistan.journalapp.service.interfaces.IPatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private IPatientService patientService;

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatient(@PathVariable Long id) {
        Patient patient = patientService.getPatientById(id);
        return ResponseEntity.ok(patient);
    }

    @PostMapping("/create")
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patientDTO) {
        System.out.println("Received request to create patient: " + patientDTO.toString());

        Patient p = patientService.createPatient(patientDTO);

        System.out.println("Patient created: " + p.toString());

        return ResponseEntity.status(HttpStatus.CREATED).body(p);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Patient> getPatientByEmail(@PathVariable String email) {
        Patient patient = patientService.getPatientByEmail(email);
        return ResponseEntity.ok(patient);
    }

    @GetMapping("/userId/{id}")
    public ResponseEntity<Patient> getPatientByUserId(@PathVariable Long id) {
        Patient patient = patientService.getPatientByUserId(id);
        return ResponseEntity.ok(patient);
    }

    @GetMapping()
    public ResponseEntity<List<Patient>> getAllPatient() {
        List<Patient> patients = patientService.getAllPatients();
        return ResponseEntity.ok(patients);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient updatedPatient) {
        Patient updated = patientService.updatePatient(id, updatedPatient);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }
}

