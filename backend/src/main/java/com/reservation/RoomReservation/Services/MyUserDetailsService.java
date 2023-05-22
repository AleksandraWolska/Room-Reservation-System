package com.reservation.RoomReservation.Services;

import com.reservation.RoomReservation.Configurations.MyUserDetails;
import com.reservation.RoomReservation.Models.User;
import com.reservation.RoomReservation.Repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class MyUserDetailsService implements UserDetailsService {


    private final UserRepository userRepository;

    public MyUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new NoSuchElementException("there is no such user!"));
        return new MyUserDetails(user);
    }
}
