package com.convopilot.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @PostMapping("/simulate")
    public ResponseEntity<?> simulate(@RequestBody Map<String, String> body) throws IOException, InterruptedException {
        String userContext = body.getOrDefault("user_context", "");
        String messageType = body.getOrDefault("message_type", "");
        String pastMessages = body.getOrDefault("past_messages", "");
        String goal = body.getOrDefault("goal", "");
        String userInput = body.getOrDefault("user_input", "");

        List<String> command = new ArrayList<>(Arrays.asList(
            "python3", "ai_engine_python/app/main.py",
            "--user_context", userContext,
            "--message_type", messageType,
            "--past_messages", pastMessages,
            "--goal", goal,
            "--user_input", userInput
        ));

        ProcessBuilder pb = new ProcessBuilder(command);
        pb.redirectErrorStream(true);
        pb.directory(new File(System.getProperty("user.dir")));
        Process process = pb.start();

        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        StringBuilder output = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            output.append(line);
        }
        int exitCode = process.waitFor();
        if (exitCode != 0) {
            return ResponseEntity.status(500).body("Python process failed");
        }
        return ResponseEntity.ok().body(output.toString());
    }
}