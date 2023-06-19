package com.reservation.RoomReservation.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "172.217.16.20:443, https://roomreservation-387515.ew.r.appspot.com/")
public class SiteController {

    @GetMapping("/")
    public String authors(){
        return "Aleksandra Wolska \nSzymon Łopuszyński 260454";
    }

}
