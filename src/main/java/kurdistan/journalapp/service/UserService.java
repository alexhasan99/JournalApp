package kurdistan.journalapp.service;

import kurdistan.journalapp.db.model.UserDb;
import kurdistan.journalapp.db.repository.UserRepository;
import kurdistan.journalapp.model.MyUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDb d = userRepository.findUserDbByUsername(username);
        return new MyUserDetails(d);
    }

}
