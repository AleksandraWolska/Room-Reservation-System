package com.reservation.RoomReservation.Utils;

import java.time.LocalDateTime;

public class TimeInstant {

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


}
