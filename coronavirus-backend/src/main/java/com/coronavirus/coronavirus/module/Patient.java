package com.coronavirus.coronavirus.module;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@Data
@Document(collection = "patient")
public class Patient {
    @Id
    public String email;
    public String fullName;
    public int age;
    public String gender;
    public String country;
    public String city;
    public String ip;
    public MedicalQuestion medicalQuestion;
    public SniffTest sniffTest;

    public Patient() {}

}