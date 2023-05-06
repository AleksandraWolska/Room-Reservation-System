package com.reservation.RoomReservation.Utils;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TimeInstant implements Comparable<TimeInstant>{

    private LocalDateTime time;
    private int year;
    private int month;
    private int day;
    private int hour;
    private int minute;

    public TimeInstant(LocalDateTime time){

        this.time = time;
        year = time.getYear();
        month = time.getMonthValue();
        day = time.getDayOfMonth();
        hour = time.getHour();
        minute = time.getMinute();

    }

    @Override
    public int compareTo(TimeInstant timeInstant) {
        return time.compareTo(timeInstant.time);
    }

    public int compareTo(LocalDateTime localDateTime) {
        return time.compareTo(localDateTime);
    }
}
