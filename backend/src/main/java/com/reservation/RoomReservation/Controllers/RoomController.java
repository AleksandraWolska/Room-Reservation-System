package com.reservation.RoomReservation.Controllers;

import com.reservation.RoomReservation.Models.Room;
import com.reservation.RoomReservation.Repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reservation/rooms")
public class RoomController {

    private final RoomRepository repository;

    @GetMapping("/")
    public ResponseEntity<List<Room>> all(){
        List<Room> rooms = repository.findAll();
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @GetMapping("/{buildingName}")
    public ResponseEntity<List<Room>> allInBuilding(@PathVariable String buildingName){
        List<Room> rooms = repository.findByBuilding(buildingName);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @GetMapping("/{buildingName},{number}")
    public ResponseEntity<Room> one(@PathVariable String buildingName, @PathVariable Integer number){
        Room room = repository
                .findByNumberInBuilding(number, buildingName)
                .orElseThrow(() -> new NoSuchElementException(buildingName));
        return new ResponseEntity<>(room, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Room> create(@RequestBody Room room){
        if(repository.existsById(room.getId())){
            throw new DuplicateKeyException(room.toString());
        }
        return new ResponseEntity<>(room, HttpStatus.OK);
    }

    @DeleteMapping("/{name},{number}")
    public ResponseEntity<Room> delete(@PathVariable String name, @PathVariable Integer number){
        Room room = repository
                .findByNumberInBuilding(number, name)
                .orElseThrow(() -> new NoSuchElementException(name));
        repository.delete(room);
        return new ResponseEntity<>(room, HttpStatus.OK);
    }
}
