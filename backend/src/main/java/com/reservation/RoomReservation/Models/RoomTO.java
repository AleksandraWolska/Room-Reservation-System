package com.reservation.RoomReservation.Models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomTO {

    private  Integer number;
    private Integer floor;
    private  Integer buildingId;
    private Integer places;
    private RoomType roomType;
    private boolean projector;
}
