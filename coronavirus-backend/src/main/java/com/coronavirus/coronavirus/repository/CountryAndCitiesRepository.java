package com.coronavirus.coronavirus.repository;

import com.coronavirus.coronavirus.module.CountryAndCities;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryAndCitiesRepository extends MongoRepository<CountryAndCities, String> {

}

