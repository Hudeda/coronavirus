package com.coronavirus.coronavirus.controller;

import com.coronavirus.coronavirus.module.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.coronavirus.coronavirus.repository.PatientRepository;

import java.util.List;

@RestController
@RequestMapping("/patient")
@CrossOrigin(origins = "http://localhost:4200")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping
    public List<Patient> getAllPatient() {
        return patientRepository.findAll();
    }

    @GetMapping("{fullName}")
    public Patient getPatientByName(@PathVariable String fullName) {
        return patientRepository.findByFullName(fullName);
    }

    @GetMapping("city/{city}")
    public List<Patient> getPatientsByCity(@PathVariable String city) {
        return patientRepository.findPatientByCity(city);
    }

    @GetMapping("country/{country}")
    public List<Patient> getPatientsByCountry(@PathVariable String country) {
        return patientRepository.findPatientByCountry(country);
    }

    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        patientRepository.save(patient);
        return patient;
    }
}
