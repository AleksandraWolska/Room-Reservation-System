package com.reservation.RoomReservation.Controllers;

import com.reservation.RoomReservation.Models.Building;
import com.reservation.RoomReservation.Repositories.BuildingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;


@RestController
@RequiredArgsConstructor
@RequestMapping("/reservation/buildings")
public class BuildingController {

    private final BuildingRepository repository;

    @GetMapping("/")
    public ResponseEntity<List<Building>> all(){
        List<Building> buildings = repository.findAll();
        return new ResponseEntity<>(buildings, HttpStatus.OK);
    }

    @GetMapping("/{name}")
    public ResponseEntity<Building> one(@PathVariable String name){
        Building building = repository
                .findByName(name)
                .orElseThrow(() -> new NoSuchElementException(name));
        return new ResponseEntity<>(building, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Building> create(@RequestBody Building building){
        return new ResponseEntity<>(building, HttpStatus.OK);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<Building> delete(@PathVariable String name){
        Building building = repository.findByName(name).orElseThrow(() -> new NoSuchElementException(name));
        repository.delete(building);
        return new ResponseEntity<>(building, HttpStatus.OK);
    }

}
