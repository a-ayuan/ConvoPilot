package com.convopilot.model;

public class Message {
    private String optimizedMessage;
    private ScoreDetails scoreDetails;

    public String getOptimizedMessage() { return optimizedMessage; }
    public void setOptimizedMessage(String optimizedMessage) { this.optimizedMessage = optimizedMessage; }

    public ScoreDetails getScoreDetails() { return scoreDetails; }
    public void setScoreDetails(ScoreDetails scoreDetails) { this.scoreDetails = scoreDetails; }
}
