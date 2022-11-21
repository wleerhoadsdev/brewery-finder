package com.techelevator.dao;

import com.techelevator.model.Beer;

import java.util.List;

public interface BeerDao {
    Beer create(Beer beer);
    Beer getBeerById(Integer breweryId, Integer beerId);
    List<Beer> getByBreweryId(int breweryId);
    Beer updateBeer(Beer beer, Integer breweryId, Integer beerId);
    void deleteBeer(Integer breweryId, Integer beerId);

}