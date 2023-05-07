package com.reservation.RoomReservation.Models.Assemblers;

import com.reservation.RoomReservation.Controllers.BuildingController;
import com.reservation.RoomReservation.Controllers.ReservationController;
import com.reservation.RoomReservation.Controllers.RoomController;
import com.reservation.RoomReservation.Models.Building;
import com.reservation.RoomReservation.Models.Reservation;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class ReservationModelAssembler  implements RepresentationModelAssembler<Reservation, EntityModel<Reservation>> {

    @Override
    public EntityModel<Reservation> toModel(Reservation reservation) {
        return EntityModel.of(
                reservation,
                linkTo(methodOn(ReservationController.class).oneId(reservation.getId())).withSelfRel(),
                linkTo(methodOn(ReservationController.class).all()).withRel("buildings"));
    }
}
