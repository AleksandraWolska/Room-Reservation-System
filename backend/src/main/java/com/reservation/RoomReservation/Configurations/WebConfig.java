package com.reservation.RoomReservation.Configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        if (!registry.hasMappingForPattern("/resources/templates/")) {
            registry.addResourceHandler("/resources/templates/").addResourceLocations("classpath:/resources/templates/");
        }
        if (!registry.hasMappingForPattern("/js/")) {
            registry.addResourceHandler("/js/").addResourceLocations("classpath:/resources/static/js/");
        }
        if (!registry.hasMappingForPattern("/css/")) {
            registry.addResourceHandler("/css/").addResourceLocations("classpath:/resources/static/cs/");
        }
        if (!registry.hasMappingForPattern("/static/")) {
            registry.addResourceHandler("/static/").addResourceLocations("classpath:/resources/static/");
        }

    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:8080")
                .allowedMethods("GET", "POST", "PUT")
                .allowedHeaders("JSESSIONID", "Cookie")
                .exposedHeaders("JSESSIONID", "Cookie")
                .allowCredentials(false).maxAge(3600);
    }
}
