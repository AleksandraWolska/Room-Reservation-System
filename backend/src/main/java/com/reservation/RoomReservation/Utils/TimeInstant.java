package com.reservation.RoomReservation.Utils;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
public class TimeInstant implements Comparable<TimeInstant>{

    public static final int DURATION = 15;
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

    public TimeInstant(int year, int month, int day, int hour, int minute){

        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.time = LocalDateTime.of(year, month, day, hour, minute);

    }


    @Override
    public int compareTo(TimeInstant timeInstant) {
        return time.compareTo(timeInstant.time);
    }

    public int compareTo(LocalDateTime localDateTime) {
        return time.compareTo(localDateTime);
    }
}
