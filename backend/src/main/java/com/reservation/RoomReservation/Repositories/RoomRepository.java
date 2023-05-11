package com.reservation.RoomReservation.Repositories;

import com.reservation.RoomReservation.Models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Integer> {

    @Query("SELECT r FROM Room r WHERE r.number = ?1 AND r.building.name = ?2")
    Optional<Room> findByNumberInBuilding(Integer number, String buildingName);

    @Query("SELECT r FROM Room r WHERE r.building.name = ?1")
    List<Room> findByBuilding(String buildingName);
}
