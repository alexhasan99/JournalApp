package kurdistan.journalapp.controller;


import kurdistan.journalapp.model.Image;
import kurdistan.journalapp.service.interfaces.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    IImageService service;


    @GetMapping("/{id}")
    public ResponseEntity<Image> getImageById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getImageById(id));
    }

    @PostMapping
    public ResponseEntity<Image> createImage(@RequestBody Image image) {
        Image i = service.createImage(image);
        System.out.println(image.getImageData());
        return ResponseEntity.status(HttpStatus.CREATED).body(i);
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<List<Image>> getImagesByPatientId(@PathVariable Long id) {
        List<Image> images = service.getImagesByPatientId(id);

        return ResponseEntity.ok(images);
    }

}
