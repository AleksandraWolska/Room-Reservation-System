package com.reservation.RoomReservation.Repositories;

import com.reservation.RoomReservation.Models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
}
