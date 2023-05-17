package com.reservation.RoomReservation.Utils.Responses;

import com.reservation.RoomReservation.Models.Building;
import com.reservation.RoomReservation.Models.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BuildingWithRoomsResponse {

    private Building building;
    private List<Room> rooms;
    private Integer roomsCount;
}
