package com.reservation.RoomReservation.Configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .cors()
            .and().authorizeHttpRequests()
            .requestMatchers("/swagger-ui/**", "/v1/**", "/v2/**", "/v3/**", "/swagger/**").permitAll()
            .requestMatchers("/reservation/users/*","/reservation/users/register", "/login").permitAll()
            .anyRequest().authenticated()
            .and().oauth2Login().loginProcessingUrl("http://localhost:3000/")
            .defaultSuccessUrl("http://localhost:3000/", true)
            .successHandler(myAuthenticationSuccessHandler())
            .and().logout()
            .logoutUrl("/logout").logoutSuccessUrl("/")
            .clearAuthentication(true)
            .invalidateHttpSession(true)
            .deleteCookies("JSESSIONID")
            .and().formLogin()
            .loginProcessingUrl("/login")
            .defaultSuccessUrl("http://localhost:3000/", true)
            .successHandler(myAuthenticationSuccessHandler()).and().sessionManagement().enableSessionUrlRewriting(true)
            .and().logout()
            .logoutUrl("/logout").logoutSuccessUrl("/")
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
