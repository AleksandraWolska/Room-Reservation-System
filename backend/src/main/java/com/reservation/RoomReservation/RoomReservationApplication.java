package com.reservation.RoomReservation;

import com.reservation.RoomReservation.Authentication.RegisterRequest;
import com.reservation.RoomReservation.Authentication.Services.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.reservation.RoomReservation.Authentication.Role.ADMIN;

@SpringBootApplication
public class RoomReservationApplication {

	public static void main(String[] args) {
		SpringApplication.run(RoomReservationApplication.class, args);
	}

//	@Bean
//	public CommandLineRunner commandLineRunner(AuthenticationService service) {
//		return args -> {
//			var admin = RegisterRequest.builder()
//					.firstname("Admin")
//					.lastname("Admin")
//					.email("admin@mail.com")
//					.password("password")
//					.role(ADMIN)
//					.build();
//			System.out.println("Admin token: " + service.register(admin).getAccessToken());
//		};
//	}
}
