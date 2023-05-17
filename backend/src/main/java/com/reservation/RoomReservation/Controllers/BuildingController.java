package com.reservation.RoomReservation.Controllers;

import com.reservation.RoomReservation.Models.Building;
import com.reservation.RoomReservation.Models.Room;
import com.reservation.RoomReservation.Repositories.BuildingRepository;
import com.reservation.RoomReservation.Repositories.RoomRepository;
import com.reservation.RoomReservation.Utils.Responses.BuildingWithRoomsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/reservation/buildings")
public class BuildingController {

    private final BuildingRepository buildingRepository;
    private final RoomRepository roomRepository;

    @GetMapping("/")
    public ResponseEntity<List<Building>> all(){
        List<Building> buildings = buildingRepository.findAll();
        return new ResponseEntity<>(buildings, HttpStatus.OK);
    }

    @GetMapping("/rooms")
    public ResponseEntity<List<BuildingWithRoomsResponse>> allWithRooms(){
        List<Building> buildings = buildingRepository.findAll();
        List<Room> rooms = roomRepository.findAll();

        List<BuildingWithRoomsResponse> response = new ArrayList<>();

        for(Building building : buildings){
            List<Room> buildingsRooms = rooms.stream().filter(room -> room.getBuilding().equals(building)).toList();
            response.add(new BuildingWithRoomsResponse(building, buildingsRooms, buildingsRooms.size()));
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Building> one(@PathVariable Integer id){
        Building building = buildingRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException(String.valueOf(id)));
        return new ResponseEntity<>(building, HttpStatus.OK);
    }

    @GetMapping("/rooms/{id}")
    public ResponseEntity<BuildingWithRoomsResponse> oneWithRooms(@PathVariable Integer id){
        Building building = buildingRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException(String.valueOf("room with id: " + id + "does not exist")));

        List<Room> rooms = roomRepository.findByBuilding(building.getName());

        BuildingWithRoomsResponse response = new BuildingWithRoomsResponse(building, rooms, rooms.size());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{name}")
    public ResponseEntity<Building> oneByName(@PathVariable String name){
        Building building = buildingRepository
                .findByName(name)
                .orElseThrow(() -> new NoSuchElementException("room " + name + "does not exist"));
        return new ResponseEntity<>(building, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Building> create(@RequestBody Building building){
        return new ResponseEntity<>(building, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Building> delete(@PathVariable Integer id){
        Building building = buildingRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException(String.valueOf(id)));
        buildingRepository.delete(building);
        return new ResponseEntity<>(building, HttpStatus.OK);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<Building> deleteByName(@PathVariable String name){
        Building building = buildingRepository.findByName(name).orElseThrow(() -> new NoSuchElementException(name));
        buildingRepository.delete(building);
        return new ResponseEntity<>(building, HttpStatus.OK);
    }

}
