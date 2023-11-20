package kurdistan.journalapp.controller;


import kurdistan.journalapp.model.Encounter;
import kurdistan.journalapp.service.interfaces.IEncounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/encounters")
public class EncounterController {

    @Autowired
    private IEncounterService eService;

    @GetMapping("/{id}")
    public ResponseEntity<Encounter> getCondition(@PathVariable Long id) {
        Encounter e = eService.getEncounterById(id);
        return ResponseEntity.ok(e);
    }

    @PostMapping
    public ResponseEntity<Encounter> createCondition(@RequestBody Encounter encounter) {
        Encounter e = eService.createEncounter(encounter);
        return ResponseEntity.status(HttpStatus.CREATED).body(e);
    }


}
