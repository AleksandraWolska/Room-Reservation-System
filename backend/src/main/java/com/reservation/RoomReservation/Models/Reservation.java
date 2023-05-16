package com.reservation.RoomReservation.Models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
