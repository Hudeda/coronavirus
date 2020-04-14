package com.coronavirus.coronavirus.module;

public enum HasBeenTested {
    NOT_TESTED("Not Tested"),
    RESULTS_PENDING("Result Pending"),
    TESTED_NEGATIVE("Tested Negative"),
    TESTED_POSITIVE("Tested Positive");

    private final String key;

    HasBeenTested(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }
}