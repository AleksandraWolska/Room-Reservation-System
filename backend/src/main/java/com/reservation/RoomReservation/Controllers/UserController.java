package com.reservation.RoomReservation.Controllers;

import com.reservation.RoomReservation.Models.Room;
import com.reservation.RoomReservation.Models.User;
import com.reservation.RoomReservation.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/reservation/users")
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/")
    public ResponseEntity<List<User>> all(){
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> one(@PathVariable Integer id){

        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("user with id: "+id+"does not exist!"));

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user){

        if(userRepository.existsByEmail(user.getEmail())){
            new ResponseEntity<>(new Object(), HttpStatus.CONFLICT);
        }

        user.setPassword(user.getPassword());
        user.setRole("USER");

        userRepository.save(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> delete(@PathVariable Integer id){

        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("user with id: "+id+"does not exist!"));

        userRepository.delete(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Integer id, @RequestBody User updated){

        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("user with id: "+id+"does not exist!"));

        updated.setId(id);

        userRepository.save(updated);

        return new ResponseEntity<>(updated, HttpStatus.OK);
    }
}
