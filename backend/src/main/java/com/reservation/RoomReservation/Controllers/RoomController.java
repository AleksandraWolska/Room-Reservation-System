package com.reservation.RoomReservation.Controllers;

import com.reservation.RoomReservation.Models.Assemblers.RoomModelAssembler;
import com.reservation.RoomReservation.Models.Room;
import com.reservation.RoomReservation.Repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reservation/rooms")
public class RoomController {

    private final RoomRepository repository;
    private final RoomModelAssembler assembler;
    @GetMapping("/")
    public CollectionModel<EntityModel<Room>> all(){
        List<EntityModel<Room>> rooms = repository
                .findAll()
                .stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(rooms, linkTo(methodOn(RoomController.class).all()).withSelfRel());
    }

    @GetMapping("/{buildingName}")
    public CollectionModel<EntityModel<Room>> allInBuilding(@PathVariable String buildingName){
        List<EntityModel<Room>> rooms = repository
                .findByBuilding(buildingName)
                .stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(rooms, linkTo(methodOn(RoomController.class).all()).withSelfRel());
    }

    @GetMapping("/{buildingName},{number}")
    public EntityModel<Room> one(@PathVariable String buildingName, @PathVariable Integer number){
        Room room = repository
                .findByNumberInBuilding(number, buildingName)
                .orElseThrow(() -> new NoSuchElementException(buildingName));
        return assembler.toModel(room);
    }

    @PostMapping("/")
    public EntityModel<Room> create(@RequestBody Room room){
        if(repository.existsById(room.getId())){
            throw new DuplicateKeyException(room.toString());
        }
        return assembler.toModel(repository.save(room));
    }

    @DeleteMapping("/{name},{number}")
    public EntityModel<Room> delete(@PathVariable String name, @PathVariable Integer number){
        Room room = repository
                .findByNumberInBuilding(number, name)
                .orElseThrow(() -> new NoSuchElementException(name));
        repository.delete(room);
        return assembler.toModel(room);
    }
}
