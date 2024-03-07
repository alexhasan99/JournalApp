package kurdistan.journalapp.controller;

import kurdistan.journalapp.model.Message;
import kurdistan.journalapp.service.interfaces.IMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/massages")
public class MassageController {

    @Autowired
    private IMessageService mService;

    @GetMapping("/{id}")
    public ResponseEntity <Message> getMassageById (@PathVariable Long id){
        return ResponseEntity.ok(mService.getMassageById(id));
    }

    @PostMapping
    public ResponseEntity<Message> createMassage(@RequestBody Message message) {
        Message m = mService.createMassage(message);
        return ResponseEntity.status(HttpStatus.CREATED).body(m);
    }

    @GetMapping("/rec/{id}")
    public ResponseEntity<List<Message>> getMassagesByReceiverId (@PathVariable Long id){
        List<Message> m = mService.getMassageByReceiverId(id);
        return ResponseEntity.ok(m);
    }

    @GetMapping("/sent/{id}")
    public ResponseEntity<List<Message>> getMassagesBySenderId (@PathVariable Long id){
        List<Message> m = mService.getMassageBySenderId(id);
        return ResponseEntity.ok(m);
    }

    @GetMapping("/conversation/{sender}/{receiver}")
    public ResponseEntity<List<Message>> getConversationBySenderAndReceiver (@PathVariable Long sender
            , @PathVariable Long receiver){

        List<Message> m = mService.getConversationBySenderAndReceiverId(sender, receiver);
        return ResponseEntity.ok(m);
    }
}
