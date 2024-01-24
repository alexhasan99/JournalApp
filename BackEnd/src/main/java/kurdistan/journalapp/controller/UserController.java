package kurdistan.journalapp.controller;

import kurdistan.journalapp.SystemOutToLogger;
import kurdistan.journalapp.model.User;
import kurdistan.journalapp.service.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

   @Autowired
    private UserService userService;

    private static final Logger logger = LogManager.getLogger(UserController.class);

   @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User myUserDetails) {
        User createdMyUserDetails = userService.createUser(myUserDetails);
        return ResponseEntity.ok(createdMyUserDetails);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestParam String username, @RequestParam String password) {
        User loggedInUser = userService.login(username, password);

        if (loggedInUser != null) {
            System.out.println("Login Success");
            return ResponseEntity.ok(loggedInUser);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
       System.out.println("HEEEEJ!!!!!!!!!!!!!!!");
        logger.error("Hello hej");
        System.out.println("Container Name: " + System.getenv("CONTAINER_NAME"));
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/log")
    public String logTest() {
        logger.info("Testloggar på INFO-nivå");
        logger.warn("Testloggar på WARN-nivå");
        logger.error("Testloggar på ERROR-nivå");
        logger.debug("Testloggar på DEBUG-nivå");
        System.out.println("HELO");
        System.out.println("Debug: System Property containerName = " + System.getProperty("CONTAINER_NAME"));
        return "Loggar genererade, kontrollera din konsol eller loggfil!";
    }

    @GetMapping("username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUserName(username);

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User updated = userService.updateUser(id, updatedUser);

        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
