package com.convopilot.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.mongodb.lang.NonNull;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    @NonNull
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                "http://localhost:5173",
                "https://convo-pilot.vercel.app/"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
