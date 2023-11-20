package kurdistan.journalapp.service.interfaces;

import org.springframework.security.core.userdetails.UserDetails;

public interface IUserService{
    UserDetails loadUserByUsername(String username);
}
