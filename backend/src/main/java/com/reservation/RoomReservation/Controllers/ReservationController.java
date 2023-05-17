package com.reservation.RoomReservation.Controllers;

import com.reservation.RoomReservation.Models.Reservation;
import com.reservation.RoomReservation.Models.Room;
import com.reservation.RoomReservation.Models.User;
import com.reservation.RoomReservation.Repositories.ReservationRepository;
import com.reservation.RoomReservation.Repositories.RoomRepository;
import com.reservation.RoomReservation.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/reservation/reservations")
public class ReservationController {
    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @GetMapping("/")
    public ResponseEntity<List<Reservation>> all(){
        List<Reservation> reservations = reservationRepository.findAll();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reservation>> allByUserId(@PathVariable Integer userId){
        List<Reservation> reservations = reservationRepository.findByUserId(userId);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/user/email/{email}")
    public ResponseEntity<List<Reservation>> allByUserEmail(@PathVariable String email){
        List<Reservation> reservations = reservationRepository.findByUserEmail(email);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> one(@PathVariable Integer id){
        Reservation reservation = reservationRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("reservation with id " + id + " does not exist"));
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    @GetMapping("/{email}{createdAt}")
    public ResponseEntity<Reservation> one(@PathVariable String email, @PathVariable LocalDateTime createdAt){
        Reservation reservation = reservationRepository
                .findByUserAndCreation(email, createdAt)
                .orElseThrow(() -> new NoSuchElementException("reservation: " + email + " at: " + createdAt.toString()));
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Reservation> create(@RequestBody Reservation reservation){

        if(reservationRepository.existsById(reservation.getId())){
            throw new DuplicateKeyException("reservation with id: " + reservation.toString() + "already exists");
        }
        return new ResponseEntity<>(reservation, HttpStatus.CREATED);
    }

    @PostMapping("/{roomId}{userId}")
    public ResponseEntity<Reservation> reserve(@PathVariable Integer roomId, @PathVariable Integer userId, @RequestBody List<LocalDateTime> timeInstants){
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NoSuchElementException("room with id: " + roomId + "does not exist"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("use with id: " + userId + "does not exist"));
        timeInstants.sort(new Comparator<LocalDateTime>() {
            @Override
            public int compare(LocalDateTime timeInstant, LocalDateTime t1) {
                return timeInstant.compareTo(t1);
            }
        });

        LocalDateTime start = timeInstants.get(0);

        LocalDateTime end = timeInstants.get(timeInstants.size() - 1);

        List<Reservation> reservationsInTime = reservationRepository.findByRoomInTime(roomId, start, end);

        if(!reservationsInTime.isEmpty()){
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }

        Reservation reservation = new Reservation();
        reservation.setCreatedAt(LocalDateTime.now());
        reservation.setRoom(room);
        reservation.setUser(user);
        reservation.setReservedFrom(start);
        reservation.setReservedTo(end);

        reservationRepository.save(reservation);

        return new ResponseEntity<>(reservation, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Reservation> delete(@PathVariable Integer id){
        Reservation reservation = reservationRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("reservation with id: " + id + "does not exist"));
        reservationRepository.delete(reservation);
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

}
