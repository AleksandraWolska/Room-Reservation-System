package com.reservation.RoomReservation.Controllers;

import com.reservation.RoomReservation.Models.Reservation;
import com.reservation.RoomReservation.Models.Room;
import com.reservation.RoomReservation.Repositories.ReservationRepository;
import com.reservation.RoomReservation.Repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reservation/reservations")
public class ReservationController {
    private final ReservationRepository repository;

    @GetMapping("/")
    public ResponseEntity<List<Reservation>> all(){
        List<Reservation> reservations = repository .findAll();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<Reservation>> allUser(@PathVariable String email){
        List<Reservation> reservations = repository.findByUser(email);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/{email}{createdAt}")
    public ResponseEntity<Reservation> one(@PathVariable String email, @PathVariable LocalDateTime createdAt){
        Reservation reservation = repository
                .findByUserAndCreation(email, createdAt)
                .orElseThrow(() -> new NoSuchElementException(email + " at: " + createdAt.toString()));
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> oneId(@PathVariable Integer id){
        Reservation reservation = repository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException(id.toString()));
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Reservation> create(@RequestBody Reservation reservation){

        if(repository.existsById(reservation.getId())){
            throw new DuplicateKeyException(reservation.toString());
        }
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Reservation> delete(@PathVariable Integer id){
        Reservation reservation = repository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException(id.toString()));
        repository.delete(reservation);
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }
}
