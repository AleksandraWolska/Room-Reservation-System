package com.reservation.RoomReservation.Models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Data
public class Reservation {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private LocalDateTime createdAt;
    private LocalDateTime reservedFrom;
    private LocalDateTime reservedTo;
    @ManyToOne
    private User user;
    @ManyToOne
    private Room room;

}
