package com.convopilot.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

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

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;

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

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
}
