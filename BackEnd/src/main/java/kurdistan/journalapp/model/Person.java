package kurdistan.journalapp.model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class Person {

    private Long id;

    private String firstname;

    private String lastname;

    private String email;

    private String gender;


    public Person(Long id, String firstname, String lastname, String email, String gender) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.gender = gender;
    }
}
