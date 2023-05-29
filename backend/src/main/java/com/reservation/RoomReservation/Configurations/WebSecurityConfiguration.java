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
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.io.IOException;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {

    @Autowired
    private UserService userService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf().disable()
            .cors()
//            .and().authorizeHttpRequests()
//                .requestMatchers("/swagger-ui/**", "/v1/**", "/v2/**", "/v3/**", "/swagger/**").permitAll()
//                .requestMatchers("/reservation/users/*","/reservation/users/register", "/login", "/login/**").permitAll()
//                .requestMatchers("/static/**", "js/**", "css/**").permitAll()
//                //.anyRequest().authenticated()
//            .and().oauth2Login()
//                .successHandler(new AuthenticationSuccessHandler() {
//                    @Override
//                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
//                                                        Authentication authentication) throws IOException, ServletException {
//                        MyOAuth2User oauthUser = new MyOAuth2User((OAuth2User) authentication.getPrincipal());
//                        userService.processOAuthPostLogin(oauthUser.getEmail());
//                        RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
//                        redirectStrategy.sendRedirect(request, response, "/index.html");
//
//                    };})
//            .and().formLogin()
//                .loginProcessingUrl("/login").successForwardUrl("/index.html")
//                .successHandler(myAuthenticationSuccessHandler())
//            .and().sessionManagement()
//                .enableSessionUrlRewriting(true)
//            .and().logout()
//                .logoutUrl("/logout")
//                .logoutSuccessUrl("/")
//                .clearAuthentication(true)
//                .invalidateHttpSession(true)
//                .deleteCookies("JSESSIONID")
            .and().httpBasic();

        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000"); // or you can set "*" to allow all origins
        config.addAllowedHeader("*"); // allows all headers
        config.addAllowedMethod("*"); // allows all methods (GET, POST, PUT, etc.)

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000","http://localhost:8080"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE"));
        configuration.setAllowCredentials(true); // set Allow-Credentials to true
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
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
