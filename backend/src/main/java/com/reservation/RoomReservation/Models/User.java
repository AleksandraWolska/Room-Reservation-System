package com.reservation.RoomReservation.Models;

import com.reservation.RoomReservation.Utils.Validator.ValidEmail;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class User{

    @Id
    @GeneratedValue
    private Integer id;
    private String firstname;
    private String lastname;

    @Column(unique=true)
    @ValidEmail
    @NonNull
    @NotEmpty
    private String email;

    private String password;

    private String role;

}
