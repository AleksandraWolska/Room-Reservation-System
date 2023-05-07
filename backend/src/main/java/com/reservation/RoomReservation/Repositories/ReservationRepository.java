package com.reservation.RoomReservation.Repositories;

import com.reservation.RoomReservation.Models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    @Query("SELECT r FROM Reservation r WHERE r.user.email = ?1 ORDER BY r.reservedTo")
    List<Reservation> findByUser(String email);

    @Query("SELECT r FROM Reservation r WHERE r.user.email = ?1 AND r.createdAt = ?2")
    Optional<Reservation> findByUserAndCreation(String email, LocalDateTime createdAt);
}
