package com.reservation.RoomReservation.Utils.Requests;

import com.reservation.RoomReservation.Models.RoomType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RoomFilterRequest {

    private LocalDateTime from;
    private LocalDateTime to;
    private String buildingName;
    private RoomType roomType;
    private Boolean isProjector;
    private Integer minPlaces;
    private Integer maxPlaces;
}
