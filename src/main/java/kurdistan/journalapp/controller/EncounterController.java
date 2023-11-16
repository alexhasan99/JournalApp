package kurdistan.journalapp.controller;


import kurdistan.journalapp.model.Condition;
import kurdistan.journalapp.model.Encounter;
import kurdistan.journalapp.service.interfaces.IEncounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/encounters")
public class EncounterController {

    @Autowired
    private IEncounterService eService;

    @GetMapping("/{id}")
    public ResponseEntity<Encounter> getEncounter(@PathVariable Long id) {
        Encounter e = eService.getEncounterById(id);
        return ResponseEntity.ok(e);
    }

    @PostMapping
    public ResponseEntity<Encounter> createEncounter(@RequestBody Encounter encounter) {
        Encounter e = eService.createEncounter(encounter);
        return ResponseEntity.status(HttpStatus.CREATED).body(e);
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<List<Encounter>> getEncountersByPatientId (@PathVariable Long id){
        List<Encounter> encounters = eService.getEncounterByPatientId(id);
        return ResponseEntity.ok(encounters);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Encounter> updateEncounter(@PathVariable Long id, @RequestBody Encounter updatedEncounter) {
        Encounter updated = eService.updateEncounter(id, updatedEncounter);
        return ResponseEntity.ok(updated);
    }

    /*@DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEncounter(@PathVariable Long id) {
        eService.deleteEncounter(id);
        return ResponseEntity.noContent().build();
    }*/
}
