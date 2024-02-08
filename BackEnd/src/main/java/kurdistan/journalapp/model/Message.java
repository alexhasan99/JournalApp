package kurdistan.journalapp.model;

import kurdistan.journalapp.db.model.MessageDb;
import lombok.Getter;
@Getter
public class Message {

    private final long id;

    private final String messageText;

    private final long receiver;

    private final long sender;

    private final String timeStamp;

    public Message(long id, long sender, long receiver, String timeStamp, String messageText) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.messageText = messageText;
        this.timeStamp = timeStamp;
    }


    public static Message fromMassageDb (MessageDb m){
        return new
                Message(m.getId(), m.getSenderId(), m.getReceiverId(), m.getTimeStamp(), m.getMessageText());
    }
}
