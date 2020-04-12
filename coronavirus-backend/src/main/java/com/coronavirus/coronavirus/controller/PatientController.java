package com.coronavirus.coronavirus.controller;

import com.coronavirus.coronavirus.module.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.coronavirus.coronavirus.repository.PatientRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    public Patient createPatient(@RequestPart(value = "cough") List<MultipartFile> cough,
                                 @RequestPart(value = "patient") Patient patient) {
        File file = new File(this.getClass().getResource("/").getPath() +"records/" + patient.fullName);
        file.mkdirs();
        for(int i = 0;  i < cough.size(); i++){
            write(cough.get(i), Paths.get(file.getPath()), i);
        }
        patientRepository.save(patient);
        return patient;
    }

    private void write(MultipartFile file, Path dir, int i) {
        Path filepath = Paths.get(dir.toString(), file.getOriginalFilename() + i + ".wav");
        try (OutputStream os = Files.newOutputStream(filepath)) {
            os.write(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
