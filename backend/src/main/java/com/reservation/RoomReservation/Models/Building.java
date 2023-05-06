package com.reservation.RoomReservation.Models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Entity
@Data
public class Building {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    @Column(unique = true)
    private String name;
    @OneToMany(cascade=CascadeType.ALL, mappedBy = "building")
    private ArrayList<Room> rooms;

    public Integer getId() {
        return id;
    }

}
