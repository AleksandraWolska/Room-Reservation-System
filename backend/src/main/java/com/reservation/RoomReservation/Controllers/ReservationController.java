package com.reservation.RoomReservation.Controllers;

import com.reservation.RoomReservation.Models.Reservation;
import com.reservation.RoomReservation.Models.Room;
import com.reservation.RoomReservation.Models.User;
import com.reservation.RoomReservation.Repositories.ReservationRepository;
import com.reservation.RoomReservation.Repositories.RoomRepository;
import com.reservation.RoomReservation.Repositories.UserRepository;
import com.reservation.RoomReservation.Utils.TimeInstant;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;


@RestController
@RequiredArgsConstructor
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

    @GetMapping("/{email}")
    public ResponseEntity<List<Reservation>> allUser(@PathVariable String email){
        List<Reservation> reservations = reservationRepository.findByUser(email);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/{email}{createdAt}")
    public ResponseEntity<Reservation> one(@PathVariable String email, @PathVariable LocalDateTime createdAt){
        Reservation reservation = reservationRepository
                .findByUserAndCreation(email, createdAt)
                .orElseThrow(() -> new NoSuchElementException(email + " at: " + createdAt.toString()));
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> oneId(@PathVariable Integer id){
        Reservation reservation = reservationRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException(id.toString()));
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Reservation> create(@RequestBody Reservation reservation){

        if(reservationRepository.existsById(reservation.getId())){
            throw new DuplicateKeyException(reservation.toString());
        }
        return new ResponseEntity<>(reservation, HttpStatus.CREATED);
    }

    @PostMapping("/{roomId}{userId}")
    public ResponseEntity<Reservation> reserve(@PathVariable Integer roomId, @PathVariable Integer userId, @RequestBody List<TimeInstant> timeInstants){
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new NoSuchElementException("dupa"));
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("dupa"));
        timeInstants.sort(new Comparator<TimeInstant>() {
            @Override
            public int compare(TimeInstant timeInstant, TimeInstant t1) {
                return timeInstant.getTime().compareTo(t1.getTime());
            }
        });

        LocalDateTime start = timeInstants.get(0).getTime();

        LocalDateTime end = timeInstants.get(timeInstants.size() - 1).getTime();

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
                .orElseThrow(() -> new NoSuchElementException(id.toString()));
        reservationRepository.delete(reservation);
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

}
