package com.coronavirus.coronavirus.repository;

import com.coronavirus.coronavirus.module.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends MongoRepository<Patient, String> {

    Patient findByFullName(String fullName);

    List<Patient> findPatientByCity(String city);

    List<Patient> findPatientByCountry(String country);

}

