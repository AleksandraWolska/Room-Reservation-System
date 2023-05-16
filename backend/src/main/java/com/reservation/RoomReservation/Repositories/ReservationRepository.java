package com.reservation.RoomReservation.Repositories;

import com.reservation.RoomReservation.Models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    @Query("SELECT r FROM Reservation r WHERE r.user.id = ?1 ORDER BY r.reservedTo")
    List<Reservation> findByUserId(Integer userId);
    @Query("SELECT r FROM Reservation r WHERE r.user.email = ?1 ORDER BY r.reservedTo")
    List<Reservation> findByUserEmail(String email);
    @Query("SELECT r FROM Reservation r WHERE r.room.id = ?1 ORDER BY r.reservedTo")
    List<Reservation> findByRoom(Integer roomId);
    @Query("SELECT r FROM Reservation r WHERE r.reservedFrom > ?1 OR r.reservedTo < ?1")
    List<Reservation> findByTime(LocalDateTime time);
    @Query("SELECT r FROM Reservation r WHERE r.reservedFrom < ?2 AND r.reservedTo > ?1")
    List<Reservation> findInTime(LocalDateTime start, LocalDateTime end);
    @Query("SELECT r FROM Reservation r WHERE r.room.id = ?1 AND r.reservedFrom < ?3 AND r.reservedTo > ?2")
    List<Reservation> findByRoomInTime(Integer roomId, LocalDateTime start, LocalDateTime end);
    @Query("SELECT r FROM Reservation r WHERE r.user.email = ?1 AND r.createdAt = ?2")
    Optional<Reservation> findByUserAndCreation(String email, LocalDateTime createdAt);
}
