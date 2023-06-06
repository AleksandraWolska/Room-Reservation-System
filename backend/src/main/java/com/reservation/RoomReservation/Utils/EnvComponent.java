package com.reservation.RoomReservation.Utils;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class EnvComponent {

    @Value("${MY_STRING:default}")
    private String myString;

    @EventListener
    public void onApplicationEvent(ApplicationReadyEvent event) {
        System.out.println(myString);
    }

    @PostConstruct
    public void printMyString() {
        System.out.println(myString);
    }
}
