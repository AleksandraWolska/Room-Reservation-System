package com.reservation.RoomReservation.Controllers;

import com.reservation.RoomReservation.Models.Assemblers.ReservationModelAssembler;
import com.reservation.RoomReservation.Models.Assemblers.RoomModelAssembler;
import com.reservation.RoomReservation.Models.Reservation;
import com.reservation.RoomReservation.Models.Room;
import com.reservation.RoomReservation.Repositories.ReservationRepository;
import com.reservation.RoomReservation.Repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reservation/reservations")
public class ReservationController {
    private final ReservationRepository repository;
    private final ReservationModelAssembler assembler;
    @GetMapping("/")
    public CollectionModel<EntityModel<Reservation>> all(){
        List<EntityModel<Reservation>> reservations = repository
                .findAll()
                .stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(reservations, linkTo(methodOn(RoomController.class).all()).withSelfRel());
    }

    @GetMapping("/{email}")
    public CollectionModel<EntityModel<Reservation>> allUser(@PathVariable String email){
        List<EntityModel<Reservation>> reservations = repository
                .findByUser(email)
                .stream()
                .map(assembler::toModel)
                .toList();
        return CollectionModel.of(reservations, linkTo(methodOn(RoomController.class).all()).withSelfRel());
    }

    @GetMapping("/{email}{createdAt}")
    public EntityModel<Reservation> one(@PathVariable String email, @PathVariable LocalDateTime createdAt){
        Reservation reservation = repository
                .findByUserAndCreation(email, createdAt)
                .orElseThrow(() -> new NoSuchElementException(email + " at: " + createdAt.toString()));
        return assembler.toModel(reservation);
    }

    @GetMapping("/{id}")
    public EntityModel<Reservation> oneId(@PathVariable Integer id){
        Reservation reservation = repository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException(id.toString()));
        return assembler.toModel(reservation);
    }

    @PostMapping("/")
    public EntityModel<Reservation> create(@RequestBody Reservation reservation){

        if(repository.existsById(reservation.getId())){
            throw new DuplicateKeyException(reservation.toString());
        }
        return assembler.toModel(repository.save(reservation));
    }

    @DeleteMapping("/{id}")
    public EntityModel<Reservation> delete(@PathVariable Integer id){
        Reservation reservation = repository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException(id.toString()));
        repository.delete(reservation);
        return assembler.toModel(reservation);
    }
}
