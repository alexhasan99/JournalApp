package com.kurdistan.Journal_Massages.controller;

import com.kurdistan.Journal_Massages.model.Massage;
import com.kurdistan.Journal_Massages.service.IMassageService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/massages")
public class MassageController {

    @Autowired
    private IMassageService mService;

    @GetMapping("/{id}")
    public ResponseEntity <Massage> getMassageById (@PathVariable Long id){
        return ResponseEntity.ok(mService.getMassageById(id));
    }

    @PostMapping
    public ResponseEntity<Massage> createMassage(@RequestBody Massage massage) {
        Massage m = mService.createMassage(massage);
        return ResponseEntity.status(HttpStatus.CREATED).body(m);
    }

    @GetMapping("/rec/{id}")
    public ResponseEntity<List<Massage>> getMassagesByReceiverId (@PathVariable Long id){
        List<Massage> m = mService.getMassageByReceiverId(id);
        return ResponseEntity.ok(m);
    }

    @GetMapping("/sent/{id}")
    public ResponseEntity<List<Massage>> getMassagesBySenderId (@PathVariable Long id){
        List<Massage> m = mService.getMassageBySenderId(id);
        return ResponseEntity.ok(m);
    }

}
