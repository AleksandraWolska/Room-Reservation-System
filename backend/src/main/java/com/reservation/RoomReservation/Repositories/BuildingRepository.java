package com.reservation.RoomReservation.Repositories;

import com.reservation.RoomReservation.Models.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Integer> {

    public Optional<Building> findByName(String name);
}
