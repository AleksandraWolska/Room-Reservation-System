package com.reservation.RoomReservation.Controllers;

import com.reservation.RoomReservation.Models.*;
import com.reservation.RoomReservation.Repositories.BuildingRepository;
import com.reservation.RoomReservation.Repositories.ReservationRepository;
import com.reservation.RoomReservation.Repositories.RoomRepository;
import com.reservation.RoomReservation.Utils.Responses.AvailabilityAtResponse;
import com.reservation.RoomReservation.Utils.Requests.RoomFilterRequest;
import com.reservation.RoomReservation.Utils.Requests.TimeRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/reservation/rooms")
public class RoomController {

    private final RoomRepository roomRepository;
    private final BuildingRepository buildingRepository;
    private final ReservationRepository reservationRepository;
    @GetMapping("/")
    public ResponseEntity<List<Room>> all(){
        List<Room> rooms = roomRepository.findAll();
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @GetMapping("/{buildingName}")
    public ResponseEntity<List<Room>> allInBuilding(@PathVariable String buildingName){
        List<Room> rooms = roomRepository.findByBuilding(buildingName);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @GetMapping("/{buildingName},{number}")
    public ResponseEntity<Room> one(@PathVariable String buildingName, @PathVariable Integer number){
        Room room = roomRepository
                .findByNumberInBuilding(number, buildingName)
                .orElseThrow(() -> new NoSuchElementException("building " + buildingName + " does not exist or room " + number + "does not exist"));
        return new ResponseEntity<>(room, HttpStatus.OK);
    }

    @GetMapping("/time/{id}")
    public ResponseEntity<List<AvailabilityAtResponse>> whenIsFree(@PathVariable Integer id, @RequestBody TimeRequest request){

        if(!roomRepository.existsById(id)){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        ArrayList<AvailabilityAtResponse> daytime = AvailabilityAtResponse.daytime(request.getDate());

        List<Reservation> reservations = reservationRepository.findByRoom(id);
        for(AvailabilityAtResponse at : daytime){
            for(Reservation reservation : reservations){
                if(at.getTimeId().compareTo(reservation.getReservedFrom()) >= 0 && at.getTimeId().isBefore(reservation.getReservedTo())){
                    at.setIsFree(false);
                    break;
                }
            }
        }
        return new ResponseEntity<>(daytime, HttpStatus.OK);
    }

    @PostMapping("/filter")
    public ResponseEntity<List<Room>> filter(@RequestBody RoomFilterRequest request){
        List<Room> rooms = roomRepository.findAll();

        LocalDateTime from = request.getFrom();
        LocalDateTime to = request.getTo();

        List<Reservation> reservations = new LinkedList<>();

        if(from != null && to != null){
            reservations = reservationRepository.findInTime(from, to);
        } else if (from != null) {
            reservations = reservationRepository.findByTime(from);
        } else if (to != null) {
            reservations = reservationRepository.findByTime(to);
        }

        Set<Integer> roomIds = reservations.stream().map(res -> res.getRoom().getId()).collect(Collectors.toSet());

        rooms = rooms.stream().filter(room -> !roomIds.contains(room.getId())).toList();

        String buildingName = request.getBuildingName();
        if(buildingName != null){
            Optional<Building> building = buildingRepository.findByName(buildingName);
            if(building.isPresent()) {
                rooms = rooms.stream().filter(room -> room.getBuilding().equals(building.get())).toList();
            }
        }
        Boolean isProjector = request.getIsProjector();
        if(isProjector != null && isProjector){
            rooms = rooms.stream().filter(room -> room.isProjector() == isProjector).toList();
        }
        RoomType roomType = request.getRoomType();
        if(roomType != null){
            rooms = rooms.stream().filter(room -> room.getRoomType() == roomType).toList();
        }
        Integer minPlaces = request.getMinPlaces();
        if(minPlaces != null){
            rooms = rooms.stream().filter(room -> room.getPlaces() >= minPlaces).toList();
        }
        Integer maxPlaces = request.getMaxPlaces();
        if(maxPlaces != null){
            rooms = rooms.stream().filter(room -> room.getPlaces() <= maxPlaces).toList();
        }

        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Room> create(@RequestBody RoomTO roomTO){
        Building building = buildingRepository.findById(roomTO.getBuildingId())
                .orElseThrow(() -> new NoSuchElementException("building with id " + roomTO.getBuildingId() + " does not exist"));

        Room room = new Room();
        room.setPlaces(roomTO.getPlaces());
        room.setRoomType(roomTO.getRoomType());
        room.setBuilding(building);
        room.setNumber(roomTO.getNumber());
        room.setFloor(roomTO.getFloor());
        room.setProjector(roomTO.isProjector());

        roomRepository.save(room);

        return new ResponseEntity<>(room, HttpStatus.OK);
    }

    @DeleteMapping("/{name},{number}")
    public ResponseEntity<Room> delete(@PathVariable String name, @PathVariable Integer number){
        Room room = roomRepository
                .findByNumberInBuilding(number, name)
                .orElseThrow(() -> new NoSuchElementException("building " + name + "does not exist, or room " + number + " does not exist"));
        roomRepository.delete(room);
        return new ResponseEntity<>(room, HttpStatus.OK);
    }


}
