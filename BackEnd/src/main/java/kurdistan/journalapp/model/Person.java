package kurdistan.journalapp.model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class Person {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String gender;


    public Person(Long id, String firstName, String lastName, String email, String gender) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
    }
}
