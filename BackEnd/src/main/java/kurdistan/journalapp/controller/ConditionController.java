package src.main.java.kurdistan.journalapp.controller;


import src.main.java.kurdistan.journalapp.model.Condition;
import src.main.java.kurdistan.journalapp.model.Staff;
import src.main.java.kurdistan.journalapp.service.interfaces.IConditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conditions")
public class ConditionController {
    @Autowired
    private IConditionService cService;

    @GetMapping("/{id}")
    public ResponseEntity<Condition> getCondition(@PathVariable Long id) {
        Condition condition = cService.getConditionById(id);
        return ResponseEntity.ok(condition);
    }

    @PostMapping
    public ResponseEntity<Condition> createCondition(@RequestBody Condition condition) {
        Condition c = cService.createCondition(condition);
        return ResponseEntity.status(HttpStatus.CREATED).body(c);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Condition> updateCondition(@PathVariable Long id, @RequestBody Condition updatedCondition) {
        Condition updated = cService.updateCondition(id, updatedCondition);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCondition(@PathVariable Long id) {
        cService.deleteCondition(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<List<Condition>> getConditionsByPatientId (@PathVariable Long id){
        List<Condition> conditions = cService.getConditionsByPatientId(id);
        return ResponseEntity.ok(conditions);
    }

}
