package kurdistan.journalapp.controller;

import kurdistan.journalapp.model.Observation;
import kurdistan.journalapp.service.interfaces.IObservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/observations")
public class ObservationController {

    @Autowired
    private IObservationService oService;

    @GetMapping("/{id}")
    public ResponseEntity<Observation> getObservation(@PathVariable Long id) {
        Observation e = oService.getObservationById(id);
        return ResponseEntity.ok(e);
    }

    @PostMapping
    public ResponseEntity<Observation> createObservation(@RequestBody Observation observation) {
        Observation e = oService.createObservation(observation);
        return ResponseEntity.status(HttpStatus.CREATED).body(e);
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<List<Observation>> getObservationsByPatientId(@PathVariable Long id) {
        List<Observation> observations = oService.getObservationsByPatientId(id);
        return ResponseEntity.ok(observations);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Observation> updateObservation(@PathVariable Long id, @RequestBody Observation updatedObservation) {
        Observation updated = oService.updateObservation(id, updatedObservation);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteObservation(@PathVariable Long id) {
        oService.deleteObservation(id);
        return ResponseEntity.noContent().build();
    }
}
