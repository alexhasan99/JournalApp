package com.kurdistan.Journal_Massages.db.entity;

import com.kurdistan.Journal_Massages.model.Massage;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "massage")
public class MassageDb {


    @Id
    @org.springframework.data.annotation.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "massage_id")
    private Long id;


    @Column(name = "sender_id", nullable = false)
    private long senderId;

    @Column(name = "receiver_id", nullable = false)
    private long receiverId;


    @Column(name = "message_text")
    private String messageText;



    public static MassageDb fromMassage (Massage massage){
        MassageDb massageDb = new MassageDb();
        massageDb.setId(massage.getId());
        massageDb.setSenderId(massage.getSender_id());
        massageDb.setReceiverId(massage.getReceiver_id());
        massageDb.setMessageText(massage.getMassage());
        return massageDb;
    }

}
