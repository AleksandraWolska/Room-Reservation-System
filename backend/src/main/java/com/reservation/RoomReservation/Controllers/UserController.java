package com.reservation.RoomReservation.Controllers;

import com.reservation.RoomReservation.Models.User;
import com.reservation.RoomReservation.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticatedPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/reservation/users")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user){

        if(userRepository.existsByEmail(user.getEmail())){
            new ResponseEntity<>(new Object(), HttpStatus.CONFLICT);
        }

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setRole("USER");

        userRepository.save(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        return Collections.singletonMap("name", principal.getAttribute("name"));
    }

    @GetMapping("/")
    public ResponseEntity<String> success(){
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @GetMapping("/current")
    public ResponseEntity<User> current(){

        User result = new User();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = new User();

        if (auth.getPrincipal() instanceof UserDetails) {
            user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new NoSuchElementException("Authenticated user doesnt exists?!?!?!?!"));
        } else if (auth.getPrincipal() instanceof AuthenticatedPrincipal) {

            user = userRepository.findByEmail((String)((DefaultOAuth2User)auth.getPrincipal()).getAttributes().get("email"))
                    .orElseThrow(() -> new NoSuchElementException("Authenticated user doesnt exists?!?!?!?!"));
        }

        result.setId(user.getId());
        result.setEmail(user.getEmail());
        result.setFirstname(user.getFirstname());
        result.setLastname(user.getLastname());

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
