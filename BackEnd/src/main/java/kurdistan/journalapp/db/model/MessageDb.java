package kurdistan.journalapp.db.model;


import jakarta.persistence.*;
import kurdistan.journalapp.model.Message;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "message")
public class MessageDb {
    @Id
    @org.springframework.data.annotation.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long id;


    @Getter @Setter
    @Column(name = "sender_id", nullable = false)
    private long senderId;

    @Getter @Setter
    @Column(name = "receiver_id", nullable = false)
    private long receiverId;

    @Getter @Setter
    @Column(name = "timeStamp", nullable = false)
    private String timeStamp;

    @Getter @Setter
    @Column(name = "message_text")
    private String messageText;


    public static MessageDb fromMassage (Message message){
        MessageDb massageDb = new MessageDb();
        massageDb.setId(message.getId());
        massageDb.setSenderId(message.getSender());
        massageDb.setReceiverId(message.getReceiver());
        massageDb.setTimeStamp(message.getTimeStamp());
        massageDb.setMessageText(message.getMessageText());
        return massageDb;
    }

}
