package com.reservation.RoomReservation.Models;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Building {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    @Column(unique = true)
    private String name;
    private Double latitude;
    private Double longitude;

}
