package com.convopilot.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/optimize")
public class MessageController {

    @PostMapping
    public ResponseEntity<?> optimizeMessage(@RequestBody OptimizeRequest request) {
        try {
            String dir = System.getProperty("user.dir");
            String userDir = dir.replace("/backend-spring", "");

            String pythonScriptPath = userDir + "/ai_engine_python/app/main.py";

            List<String> command = new ArrayList<>();
            command.add("python3");
            command.add(pythonScriptPath);
            command.add("--user_context");  
            command.add(request.getUserContext());
            command.add("--message_type");  
            command.add(request.getMessageType());
            command.add("--past_messages"); 
            command.add(request.getPastMessages());
            command.add("--goal");          
            command.add(request.getGoal());
            command.add("--user_input");    
            command.add(request.getUserInput());

            ProcessBuilder pb = new ProcessBuilder(command);
            pb.redirectErrorStream(true);

            Process process = pb.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder outputBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                outputBuilder.append(line);
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                return ResponseEntity.status(500).body("Python process failed with exit code: " + exitCode);
            }

            return ResponseEntity.ok().body(outputBuilder.toString());

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Backend error: " + e.getMessage());
        }
    }

     public static class OptimizeRequest {
        private String userContext;
        private String messageType;
        private String pastMessages;
        private String goal;
        private String userInput;

        public String getUserContext() { return userContext; }
        public void setUserContext(String userContext) { this.userContext = userContext; }

        public String getMessageType() { return messageType; }
        public void setMessageType(String messageType) { this.messageType = messageType; }

        public String getPastMessages() { return pastMessages; }
        public void setPastMessages(String pastMessages) { this.pastMessages = pastMessages; }

        public String getGoal() { return goal; }
        public void setGoal(String goal) { this.goal = goal; }

        public String getUserInput() { return userInput; }
        public void setUserInput(String userInput) { this.userInput = userInput; }
    }
}