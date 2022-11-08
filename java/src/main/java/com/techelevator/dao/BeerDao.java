package com.techelevator.dao;

import com.techelevator.model.Beer;

import java.util.List;

public interface BeerDao {
    Beer create(Beer beer);
    List<Beer> getById(int beerId);
    List<Beer> getByBreweryId(int breweryId);
    Beer update(Beer beer);
    void delete(int beerId);
}