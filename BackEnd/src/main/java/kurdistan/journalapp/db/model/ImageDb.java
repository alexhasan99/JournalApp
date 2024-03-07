package kurdistan.journalapp.db.model;

import jakarta.persistence.*;
import kurdistan.journalapp.model.Image;
import lombok.Getter;
import lombok.Setter;

import java.util.Base64;

@Entity
@Getter
@Setter
public class ImageDb {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @Lob
    private byte[] imageData;

    private Long patientId;

    public ImageDb() {
    }

    public ImageDb(String name, String description, byte[] imageData) {
        this.name = name;
        this.description = description;
        this.imageData = imageData;
    }

    public ImageDb(Long id ,String name, String description, byte[] imageData, Long patientId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageData = imageData;
        this.patientId= patientId;
    }

    public static ImageDb FromImage(Image image){
        return new ImageDb(image.getId(), image.getName(), image.getDescription(),
                convertToByteArray(image.getImageData()), image.getPatientId());
    }

    public static byte[] convertToByteArray(String imageData) {
        return Base64.getDecoder().decode(imageData);
    }
}
