package com.reservation.RoomReservation.Models.Assemblers;

import com.reservation.RoomReservation.Controllers.BuildingController;
import com.reservation.RoomReservation.Controllers.RoomController;
import com.reservation.RoomReservation.Models.Room;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class RoomModelAssembler implements RepresentationModelAssembler<Room, EntityModel<Room>> {
    @Override
    public EntityModel<Room> toModel(Room room) {
        return EntityModel.of(
                room,
                linkTo(methodOn(RoomController.class).one(room.getBuilding().getName(), room.getNumber())).withSelfRel(),
                linkTo(methodOn(RoomController.class).all()).withRel("rooms"),
                linkTo(methodOn(BuildingController.class).one(room.getBuilding().getName())).withRel("building")
                );
    }
}
