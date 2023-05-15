package com.reservation.RoomReservation.Utils;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;

@Data
public class AvailabilityAt {

    private static final LocalTime DAY_START = LocalTime.of(7, 0);
    private static final LocalTime DAY_END = LocalTime.of(22, 00);
    private static final Integer INTERVAL = 15;

    private LocalDateTime timeId;
    private Boolean isFree;

    public AvailabilityAt(LocalDateTime time){
        timeId = time;
        isFree = true;
    }

    public static ArrayList<AvailabilityAt> daytime(LocalDate day){
        ArrayList<AvailabilityAt> daytime = new ArrayList<>();

        LocalDateTime curr = LocalDateTime.of(day, DAY_START);
        while (!curr.equals(LocalDateTime.of(day, DAY_END))){

            daytime.add(new AvailabilityAt(curr));
            curr = curr.plusMinutes(INTERVAL);
        }

        return daytime;
    }
}
