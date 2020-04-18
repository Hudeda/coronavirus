package com.coronavirus.coronavirus.controller;

import com.coronavirus.coronavirus.module.CountryAndCities;
import com.coronavirus.coronavirus.module.Patient;
import com.coronavirus.coronavirus.repository.CountryAndCitiesRepository;
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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/patient")
@CrossOrigin(origins = "http://localhost:4200")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private CountryAndCitiesRepository countryAndCitiesRepository;

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
    public List<Patient> countries(@PathVariable String country) {
        return patientRepository.findPatientByCountry(country);
    }

    @GetMapping("countryAndCities")
    public List<CountryAndCities> countryAndCities() {
        return countryAndCitiesRepository.findAll();
    }

    @GetMapping("valid/{email}")
    public int getExistingEmail(@PathVariable String email) throws IOException {
        String path = new File(new File(".").getAbsolutePath()).getCanonicalPath() +"/records/" + email;
        return Files.exists(Paths.get(path)) ? Objects.requireNonNull(new File(path).list()).length: 0;
    }

    @PostMapping
    public Patient createPatient(@RequestPart(value = "cough") List<MultipartFile> cough,
                                 @RequestPart(value = "patient") Patient patient) throws IOException {
        patient.setCreatedDate(LocalDateTime.now());
        patient = patientRepository.save(patient);
        String path = new File(new File(".").getAbsolutePath()).getCanonicalPath() +"/records/" + LocalDate.now().toString();
        File file;
        if(Files.notExists(Paths.get(path))) {
            file = new File(path);
            file.mkdirs();
        }
        file = new File(path + "/" + patient.getId());
        file.mkdirs();
        for(int i = 0;  i < cough.size(); i++){
            write(cough.get(i), Paths.get(file.getPath()), i);
        }
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
