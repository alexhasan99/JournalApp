package src.main.java.kurdistan.journalapp.model;

import lombok.Getter;

public class Massage {

    @Getter
    private int id;
    @Getter
    private String massage;

    public Massage(int id, String massage) {
        this.id = id;
        this.massage = massage;
    }
}
