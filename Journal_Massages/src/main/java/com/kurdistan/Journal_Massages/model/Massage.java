package com.kurdistan.Journal_Massages.model;

import com.kurdistan.Journal_Massages.db.entity.MassageDb;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Massage {

    private long id;

    private String massage;

    private long receiver_id;

    private long sender_id;

    public Massage(long id, long sender_id, long receiver_id, String massage) {
        this.id = id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.massage = massage;
    }


    public static Massage fromMassageDb (MassageDb m){
        return new
                Massage(m.getId(), m.getSenderId(), m.getReceiverId(), m.getMessageText());
    }
}
