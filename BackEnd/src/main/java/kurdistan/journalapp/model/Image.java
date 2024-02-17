package kurdistan.journalapp.model;


import kurdistan.journalapp.db.model.ImageDb;
import lombok.Getter;
import lombok.Setter;

import java.util.Base64;

@Getter
@Setter
public class Image {

    private Long id;
    private String name;
    private String description;
    private String imageData; // Antas vara bas64-kodad sträng
    private Long patientId;

    // Konstruktorer
    public Image() {
    }

    public Image(Long id, String name, String description, String imageData, Long patientId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageData = imageData;
        this.patientId = patientId;
    }

    public static Image FromImageDb(ImageDb i){
        return new Image(i.getId(), i.getName(), i.getDescription(),
                convertToBase64(i.getImageData()), i.getPatientId());
    }

    public static String convertToBase64(byte[] imageData) {
        return Base64.getEncoder().encodeToString(imageData);
    }
}
