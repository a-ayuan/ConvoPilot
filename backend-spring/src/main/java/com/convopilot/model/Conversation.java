package com.convopilot.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "conversations")
public class Conversation {
    @Id
    private String id;
    private String userContext;
    private String messageType;
    private String goal;
    private String userInput;
    private String pastMessages;
    private List<Message> messages = new ArrayList<>();

    public String getId() { return id; }

    public String getUserContext() { return userContext; }
    public void setUserContext(String userContext) { this.userContext = userContext; }

    public String getMessageType() { return messageType; }
    public void setMessageType(String messageType) { this.messageType = messageType; }

    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }

    public String getUserInput() { return userInput; }
    public void setUserInput(String userInput) { this.userInput = userInput; }

    public String getPastMessages() { return pastMessages; }
    public void setPastMessages(String pastMessages) { this.pastMessages = pastMessages; }

    public List<Message> getMessages() { return messages; }
    public void setMessages(List<Message> messages) { this.messages = messages; }
}
