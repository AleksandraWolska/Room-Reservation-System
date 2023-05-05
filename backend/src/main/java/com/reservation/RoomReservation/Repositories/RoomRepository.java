package com.reservation.RoomReservation.Repositories;

import com.reservation.RoomReservation.Models.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Integer> {

    Optional<Room> findByNumber(Integer number);
}
