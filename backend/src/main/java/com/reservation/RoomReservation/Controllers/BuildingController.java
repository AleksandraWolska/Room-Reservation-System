package com.reservation.RoomReservation.Controllers;

import com.reservation.RoomReservation.Models.Building;
import com.reservation.RoomReservation.Repositories.BuildingRepository;
import com.reservation.RoomReservation.Models.Assemblers.BuildingModelAssembler;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reservation/buildings")
public class BuildingController {

    private final BuildingRepository repository;
    private final BuildingModelAssembler assembler;

    @GetMapping("/")
    public CollectionModel<EntityModel<Building>> all(){
        List<EntityModel<Building>> buildings = repository
                .findAll()
                .stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());
        return CollectionModel.of(buildings, linkTo(methodOn(BuildingController.class).all()).withSelfRel());
    }

    @GetMapping("/{name}")
    public EntityModel<Building> one(@PathVariable String name){
        Building building = repository
                .findByName(name)
                .orElseThrow(() -> new NoSuchElementException(name));
        return assembler.toModel(building);
    }

    @PostMapping("/")
    public EntityModel<Building> create(@RequestBody Building building){
        return assembler.toModel(repository.save(building));
    }

    @DeleteMapping("/{name}")
    public EntityModel<Building> delete(@PathVariable String name){
        Building building = repository.findByName(name).orElseThrow(() -> new NoSuchElementException(name));
        repository.delete(building);
        return assembler.toModel(building);
    }

}
