package com.reservation.RoomReservation.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ViewController {

    @GetMapping("/index.html")
    public ModelAndView home() {
        ModelAndView mav=new ModelAndView("index");
        return mav;
    }
//    @RequestMapping("/")
//    public String react(){
//        return "index";
//    }
}
