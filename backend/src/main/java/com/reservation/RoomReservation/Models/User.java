package com.reservation.RoomReservation.Models;

import jakarta.persistence.*;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User{

    @Id
    @GeneratedValue
    @Getter
    @Setter
    private Integer id;
    @Getter
    @Setter
    private String firstname;
    @Getter
    @Setter
    private String lastname;
    @Getter
    @Setter
    @Column(unique=true)
    private String email;
    @Setter
    private String password;

}
