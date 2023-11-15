package kurdistan.journalapp.db.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "message")
public class MessageDb {
    @Id
    @org.springframework.data.annotation.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long id;


    @Getter @Setter
    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private UserDb sender;

    @Getter @Setter
    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private UserDb receiver;

    @Getter @Setter
    @Column(name = "message_text")
    private String messageText;

}
