package com.reservation.RoomReservation.Models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.NonNull;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Room {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private  Integer number;
    private Integer floor;
    @ManyToOne
    @JoinColumn(name = "building_id",nullable = false)
    private  Building building;
    private Integer places;
    private RoomType roomType;
    private boolean projector;

}
