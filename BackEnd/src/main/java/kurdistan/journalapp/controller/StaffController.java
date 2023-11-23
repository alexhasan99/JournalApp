package src.main.java.kurdistan.journalapp.controller;

import src.main.java.kurdistan.journalapp.model.Staff;
import src.main.java.kurdistan.journalapp.service.interfaces.IStaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/staffs")
public class StaffController {

    @Autowired
    private IStaffService doctorService;

    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaffById(@PathVariable Long id) {
        Staff staff = doctorService.getStaffById(id);
        return ResponseEntity.ok(staff);
    }

    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaff() {
        List<Staff> staff = doctorService.getAllStaff();
        return ResponseEntity.ok(staff);
    }

    @PostMapping
    public ResponseEntity<Staff> createStaff(@RequestBody Staff staff) {
        Staff createdStaff = doctorService.createStaff(staff);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStaff);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable Long id, @RequestBody Staff updatedStaff) {
        Staff updated = doctorService.updateStaff(id, updatedStaff);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable Long id) {
        doctorService.deleteStaff(id);
        return ResponseEntity.noContent().build();
    }
}
