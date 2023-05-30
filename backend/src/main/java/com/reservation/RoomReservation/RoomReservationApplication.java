package com.reservation.RoomReservation;

import com.reservation.RoomReservation.Models.*;
import com.reservation.RoomReservation.Repositories.BuildingRepository;
import com.reservation.RoomReservation.Repositories.ReservationRepository;
import com.reservation.RoomReservation.Repositories.RoomRepository;
import com.reservation.RoomReservation.Repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Random;

import static com.reservation.RoomReservation.Models.RoomType.*;

@SpringBootApplication
public class RoomReservationApplication{

	public static void main(String[] args) {
		SpringApplication.run(RoomReservationApplication.class, args);
	}

//	@Bean
//	public CommandLineRunner commandLineRunner(UserRepository userRepository, PasswordEncoder passwordEncoder){
//
//		return args -> {
//			User user = User.builder()
//						.email("user0@mail.com")
//						.firstname("user0")
//						.lastname("name0")
//						.password(passwordEncoder.encode("1234"))
//						.role("USER")
//						.build();
//				userRepository.save(user);
//		};
//
//	}
//	@Bean
//	public CommandLineRunner commandLineRunner(UserRepository userRepository, BuildingRepository buildingRepository,
//											   RoomRepository roomRepository, ReservationRepository reservationRepository,
//											   PasswordEncoder passwordEncoder) {
//
//		int NoUsers = 30;
//		int NoBuildings = 10;
//		int maxFloors = 4;
//		int NoRooms = 100;
//		int NoReservations = 5000;
//		LocalDateTime startDate = LocalDateTime.of(2023, 5,1,7,0);
//		int maxHours = 13;
//		double lat = 51.10;
//		double longi = 17.05;
//		int maxPlaces = 150 - 8;
//		int maxMonths = 1;
//		int maxDays = 30;
//		int maxDuration = 8;
//
//		RoomType[] types = new RoomType[]{
//				LECTURE_ROOM,
//				WORKSHOP,
//				COMPUTERS_ROOM,
//				CHEMISTRY_LABORATORY,
//				OFFICE};
//
//		ArrayList<User> users = new ArrayList<>();
//		ArrayList<Building> buildings = new ArrayList<>();
//		ArrayList<Room> rooms = new ArrayList<>();
//
//
//		return args -> {
//			Random rng = new Random();
//			for(int i = 0; i < NoUsers; i++){
//				User user = User.builder()
//						.email("user"+i+"@mail.com")
//						.firstname("user")
//						.lastname("name"+i)
//						.password(passwordEncoder.encode("1234"))
//						.role("USER")
//						.build();
//				users.add(user);
//				userRepository.save(user);
//			}
//			for(int i=0; i< NoBuildings; i++){
//				Building building = Building.builder()
//						.name((char)(rng.nextInt(26)+65)+ "-" + i)
//						.latitude(lat + rng.nextDouble()/10)
//						.longitude(longi + rng.nextDouble()/10)
//						.build();
//				buildings.add(building);
//				buildingRepository.save(building);
//			}
//			for(int i = 0; i < NoRooms; i++){
//				Room room = Room.builder()
//						.building(buildings.get(rng.nextInt(buildings.size())))
//						.floor(rng.nextInt(maxFloors))
//						.projector(rng.nextBoolean())
//						.number(i)
//						.places(rng.nextInt(maxPlaces) + 15)
//						.roomType(types[rng.nextInt(types.length)])
//						.build();
//				rooms.add(room);
//				roomRepository.save(room);
//			}
//			for(int i = 0; i < NoReservations; i++){
//
//
//				Room room = rooms.get(rng.nextInt(rooms.size()));
//				User user = users.get(rng.nextInt(users.size()));
//				for(int j = 0; j < 3; j++){
//					LocalDateTime from = startDate
//							.plusMonths(rng.nextInt(maxMonths))
//							.plusDays(rng.nextInt(maxDays))
//							.plusHours(rng.nextInt(maxHours))
//							.plusMinutes(rng.nextInt(4)*15);
//
//					LocalDateTime to = from.plusMinutes(rng.nextInt(maxDuration)*15);
//					if(reservationRepository.findByRoomInTime(room.getId(), from, to).isEmpty()){
//						Reservation reservation = Reservation.builder()
//								.user(user)
//								.room(room)
//								.reservedTo(to)
//								.reservedFrom(from)
//								.createdAt(from.minusDays(rng.nextInt(7)))
//								.build();
//						reservationRepository.save(reservation);
//					}
//				}
//			}
//		};
//	}

}
