package com.convopilot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class ConvoPilotApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConvoPilotApplication.class, args);
    }
}