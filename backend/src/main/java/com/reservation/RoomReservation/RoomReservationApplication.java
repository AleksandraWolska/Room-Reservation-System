package com.reservation.RoomReservation;

import com.reservation.RoomReservation.Models.Building;
import com.reservation.RoomReservation.Models.Room;
import com.reservation.RoomReservation.Models.User;
import com.reservation.RoomReservation.Repositories.BuildingRepository;
import com.reservation.RoomReservation.Repositories.ReservationRepository;
import com.reservation.RoomReservation.Repositories.RoomRepository;
import com.reservation.RoomReservation.Repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.info.ProjectInfoProperties;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.Bean;
;
import java.time.LocalDateTime;
import java.util.ArrayList;

@SpringBootApplication
public class RoomReservationApplication{

	public static void main(String[] args) {
		SpringApplication.run(RoomReservationApplication.class, args);
	}

//	@Bean
//	public CommandLineRunner commandLineRunner() {
//
//		int NoUsers = 30;
//		int NoBuildings = 40;
//		int maxFloors = 4;
//		int NoRooms = 750;
//		int NoReservations = 400;
//		LocalDateTime startDate = LocalDateTime.of(2023, 3,29,7,0);
//		int maxHours = 14;
//
//		ArrayList<User> users = new ArrayList<>();
//		ArrayList<Building> buildings = new ArrayList<>();
//		ArrayList<Room> rooms = new ArrayList<>();
//
//
//		return args -> {
//
//		};
//	}

}
