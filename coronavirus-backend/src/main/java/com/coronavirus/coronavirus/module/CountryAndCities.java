package com.coronavirus.coronavirus.module;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Data
@Document(collection = "CountryAndCities")
public class CountryAndCities {
    public String countryName;
    public List<String> cities;
}
