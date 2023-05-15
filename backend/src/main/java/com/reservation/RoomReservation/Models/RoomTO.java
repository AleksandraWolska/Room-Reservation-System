package com.reservation.RoomReservation.Models;


import lombok.Data;

@Data
public class RoomTO {

    private  Integer number;
    private Integer floor;
    private  Integer buildingId;
    private Integer places;
    private RoomType roomType;
    private boolean projector;
}
