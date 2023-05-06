package com.reservation.RoomReservation.Models.Assemblers;

import com.reservation.RoomReservation.Controllers.BuildingController;
import com.reservation.RoomReservation.Models.Building;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class BuildingModelAssembler implements RepresentationModelAssembler<Building, EntityModel<Building>> {
    @Override
    public EntityModel<Building> toModel(Building building) {
        return EntityModel.of(
                building,
                linkTo(methodOn(BuildingController.class).one(building.getName())).withSelfRel(),
                linkTo(methodOn(BuildingController.class).all()).withRel("buildings"));
    }
}
