package com.reservation.RoomReservation.Controllers;

import com.reservation.RoomReservation.Models.User;
import com.reservation.RoomReservation.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/reservation/users")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user){

        if(userRepository.existsByEmail(user.getEmail())){
            new ResponseEntity<>(new Object(), HttpStatus.CONFLICT);
        }

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setRole("USER");

        userRepository.save(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
