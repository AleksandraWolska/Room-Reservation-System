package com.reservation.RoomReservation.Utils;

import com.reservation.RoomReservation.Models.User;
import com.reservation.RoomReservation.Repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public void processOAuthPostLogin(String username, String nick) {
        Optional<User> existUser = userRepository.findByEmail(username);

        if (existUser.isEmpty()) {
            User newUser = new User();
            newUser.setEmail(username);
            newUser.setRole("USER");
            newUser.setLastname("Google user");
            newUser.setFirstname(nick);

            userRepository.save(newUser);
        }
    }
}
