package kurdistan.journalapp.service.interfaces;

import kurdistan.journalapp.model.Image;

import java.util.List;

public interface IImageService {

    Image createImage (Image image);

    Image getImageById (Long id);

    List<Image> getImagesByPatientId (Long id);
}
