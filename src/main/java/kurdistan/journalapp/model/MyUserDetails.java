package kurdistan.journalapp.model;

import kurdistan.journalapp.db.model.UserDb;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;


@Getter
@Setter

public class MyUserDetails  implements UserDetails {


    private Long id;

    private String username;


    private String password;

    private List<GrantedAuthority> role;

    private  Boolean active;

    public MyUserDetails(UserDb u) {
        this.id = u.getId();
        this.username = u.getUsername();
        this.password = u.getPassword();
        this.role = Arrays.stream(u.getRole().split("")).
        map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        active = u.isActive();
    }

    public MyUserDetails(){
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
