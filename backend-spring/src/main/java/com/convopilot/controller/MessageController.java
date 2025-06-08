package com.convopilot.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.convopilot.model.Conversation;
import com.convopilot.model.Message;
import com.convopilot.model.ScoreDetails;
import com.convopilot.repository.ConversationRepository;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/optimize")
public class MessageController {

    @Autowired
    private ConversationRepository conversationRepository;

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
                System.err.println("Python error output: " + outputBuilder.toString());
                return ResponseEntity.status(500).body("Python process failed with exit code: " + exitCode + ". Output: " + outputBuilder.toString());
            }

            ObjectMapper mapper = new ObjectMapper();
            JsonNode resultNode = mapper.readTree(outputBuilder.toString());

            Conversation conversation = new Conversation();
            conversation.setUserContext(request.getUserContext());
            conversation.setMessageType(request.getMessageType());
            conversation.setGoal(request.getGoal());
            conversation.setUserInput(request.getUserInput());
            conversation.setPastMessages(request.getPastMessages());

            // Store all three optimized messages with their score details
            List<Message> messages = new ArrayList<>();
            if (resultNode.has("suggestions") && resultNode.get("suggestions").isArray()) {
                for (JsonNode suggestion : resultNode.get("suggestions")) {
                    Message msg = new Message();
                    String msgText = suggestion.has("message") ? suggestion.get("message").asText() : "";
                    msg.setOptimizedMessage(msgText);

                    // ScoreDetails mapping
                    ScoreDetails scoreDetails = new ScoreDetails();
                    if (suggestion.has("final_score")) {
                        scoreDetails.setFinal_score(suggestion.get("final_score").asDouble());
                    }
                    if (suggestion.has("polarity")) {
                        scoreDetails.setPolarity(suggestion.get("polarity").asDouble());
                    }
                    if (suggestion.has("subjectivity")) {
                        scoreDetails.setSubjectivity(suggestion.get("subjectivity").asDouble());
                    }
                    if (suggestion.has("visits")) {
                        scoreDetails.setVisits(suggestion.get("visits").asInt());
                    }
                    if (suggestion.has("value")) {
                        scoreDetails.setValue(suggestion.get("value").asDouble());
                    }
                    msg.setScoreDetails(scoreDetails);

                    messages.add(msg);
                }
            }
            conversation.setMessages(messages);

            conversationRepository.save(conversation);

            return ResponseEntity.ok().body(outputBuilder.toString());

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Backend error: " + e.getMessage());
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> getHistory() {
        List<Conversation> conversations = conversationRepository.findAll();
        conversations.sort(Comparator.comparing(Conversation::getCreatedAt, Comparator.nullsLast(Date::compareTo)).reversed());
        return ResponseEntity.ok(conversations);
    }

    public static class OptimizeRequest {
        @JsonProperty("user_context")
        private String userContext;
        @JsonProperty("message_type")
        private String messageType;
        @JsonProperty("past_messages")
        private String pastMessages;
        @JsonProperty("goal")
        private String goal;
        @JsonProperty("user_input")
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
