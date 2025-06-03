package com.convopilot.model;

public class ScoreDetails {
    private double final_score;
    private double polarity;
    private double subjectivity;
    private int visits;
    private double value;

    public double getFinal_score() { return final_score; }
    public void setFinal_score(double final_score) { this.final_score = final_score; }

    public double getPolarity() { return polarity; }
    public void setPolarity(double polarity) { this.polarity = polarity; }

    public double getSubjectivity() { return subjectivity; }
    public void setSubjectivity(double subjectivity) { this.subjectivity = subjectivity; }

    public int getVisits() { return visits; }
    public void setVisits(int visits) { this.visits = visits; }

    public double getValue() { return value; }
    public void setValue(double value) { this.value = value; }
}
