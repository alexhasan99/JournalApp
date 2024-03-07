package kurdistan.journalapp.service.interfaces;

import kurdistan.journalapp.model.Message;

import java.util.List;

public interface IMessageService {
    Message getMassageById(Long id);

    Message createMassage(Message message);

    Message updateMassage(Long id, Message message);

    List<Message> getMassageByReceiverId(Long id);

    List<Message> getMassageBySenderId(Long id);

    List<Message> getConversationBySenderAndReceiverId(Long sender, Long receiver);
}
