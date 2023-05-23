package com.reservation.RoomReservation.Configurations;

import com.reservation.RoomReservation.Services.MyUserDetailsService;
import com.reservation.RoomReservation.Utils.MyOAuth2User;
import com.reservation.RoomReservation.Utils.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {

    @Autowired
    private UserService userService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.cors()
            .and().authorizeHttpRequests()
                .requestMatchers("/swagger-ui/**", "/v1/**", "/v2/**", "/v3/**", "/swagger/**").permitAll()
                .requestMatchers("/reservation/users/*","/reservation/users/register", "/login", "/login/**").permitAll()
                .anyRequest().authenticated()
            .and().oauth2Login()
                .defaultSuccessUrl("http://localhost:3000/", true)
                .successHandler(new AuthenticationSuccessHandler() {
                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                                        Authentication authentication) throws IOException, ServletException {
                        MyOAuth2User oauthUser = new MyOAuth2User((OAuth2User) authentication.getPrincipal());
                        userService.processOAuthPostLogin(oauthUser.getEmail());

                        response.sendRedirect("http://localhost:3000/");
                    };})
            .and().formLogin()
                .loginProcessingUrl("/login")
                .defaultSuccessUrl("http://localhost:3000/", true)
                .successHandler(myAuthenticationSuccessHandler())
            .and().sessionManagement()
                .enableSessionUrlRewriting(true)
            .and().logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .clearAuthentication(true)
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
            .and().httpBasic();

        return http.build();
    }



    @Bean
    public AuthenticationSuccessHandler myAuthenticationSuccessHandler(){
        return new MySimpleUrlAuthenticationSuccessHandler();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
