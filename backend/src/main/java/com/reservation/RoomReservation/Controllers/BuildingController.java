package com.reservation.RoomReservation.Controllers;

import com.reservation.RoomReservation.Models.Building;
import com.reservation.RoomReservation.Repositories.BuildingRepository;
import com.reservation.RoomReservation.Models.Assemblers.BuildingModelAssembler;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class BuildingController {

    private final BuildingRepository repository;
    private final BuildingModelAssembler assembler;

    public BuildingController(BuildingRepository buildingRepository, BuildingModelAssembler buildingAssembler){
        this.repository = buildingRepository;
        this.assembler = buildingAssembler;
    }

    @GetMapping("/buildings")
    public CollectionModel<EntityModel<Building>> all(){
        List<EntityModel<Building>> buildings = repository
                .findAll()
                .stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(buildings, linkTo(methodOn(BuildingController.class).all()).withSelfRel());
    }

    @GetMapping("/buildings/{name}")
    public EntityModel<Building> one(@PathVariable String name){
        Building building = repository
                .findByName(name) //
                .orElseThrow(() -> new NoSuchElementException(name));
        return assembler.toModel(building);
    }
}
