package kurdistan.journalapp.service;

import kurdistan.journalapp.db.model.MessageDb;
import kurdistan.journalapp.db.repository.MessageRepository;
import kurdistan.journalapp.model.Message;
import kurdistan.journalapp.service.interfaces.IMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MassageService implements IMessageService {

    @Autowired
    private MessageRepository massageRepository;


    @Override
    public Message getMassageById(Long id) {
        return Message.fromMassageDb(massageRepository.getMassageDbById(id));
    }

    @Override
    public Message createMassage(Message message) {
        System.out.println(message.getMessageText());
        massageRepository.save(MessageDb.fromMassage(message));
        return message;
    }

    @Override
    public Message updateMassage(Long id, Message message) {
        return null;
    }

    @Override
    public List<Message> getMassageByReceiverId(Long id) {
        List <Message> messages = new ArrayList<>();
        for (MessageDb m: massageRepository.getMassageDbsByReceiverId(id)
        ) {
            messages.add(Message.fromMassageDb(m));
        }
        return messages;
    }

    @Override
    public List<Message> getMassageBySenderId(Long id) {
        List <Message> messages = new ArrayList<>();
        for (MessageDb m: massageRepository.getMassageDbsBySenderId(id)
        ) {
            messages.add(Message.fromMassageDb(m));
        }
        return messages;
    }

    @Override
    public List<Message> getConversationBySenderAndReceiverId(Long sender, Long receiver) {

        List <Message> messages = new ArrayList<>();
        for (MessageDb m: massageRepository.getMessageDbBySenderIdAndReceiverId(sender, receiver)
        ) {
            messages.add(Message.fromMassageDb(m));
        }
        return messages;
    }

}