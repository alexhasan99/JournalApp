package kurdistan.journalapp.service;

import kurdistan.journalapp.db.model.ImageDb;
import kurdistan.journalapp.db.repository.ImageRepository;
import kurdistan.journalapp.model.Image;
import kurdistan.journalapp.service.interfaces.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ImageServiceImpl implements IImageService {

    @Autowired
    private ImageRepository imageRepository;


    @Override
    public Image createImage(Image image) {
        imageRepository.save(ImageDb.FromImage(image));
        return image;
    }

    @Override
    public Image getImageById(Long id) {
        return Image.FromImageDb(imageRepository.getImageDbById(id));
    }

    @Override
    public List<Image> getImagesByPatientId(Long id) {
        List<Image> images = new ArrayList<>();
        for (ImageDb db: imageRepository.getImageDbsByPatientId(id)) {
            images.add(Image.FromImageDb(db));
        }
        return images;
    }
}
