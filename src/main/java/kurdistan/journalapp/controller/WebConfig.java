package kurdistan.journalapp.controller;

import jakarta.persistence.Id;
import kurdistan.journalapp.service.UserService;
import kurdistan.journalapp.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebConfig {

    @Autowired
    UserService userService;

    @Bean
    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        return http.formLogin(Customizer.withDefaults()).userDetailsService(userService)
                .authorizeHttpRequests(req-> req.requestMatchers("/login/**").permitAll()
                                .anyRequest().authenticated()).build();
    }
}
