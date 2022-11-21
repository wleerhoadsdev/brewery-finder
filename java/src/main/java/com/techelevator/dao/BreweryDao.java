package com.techelevator.dao;

import com.techelevator.model.Brewery;
import com.techelevator.model.BreweryListItem;
import com.techelevator.model.User;

import java.util.List;

public interface BreweryDao {

    Brewery create(Brewery brewery);
    List<BreweryListItem> listAll();
    Brewery getByBrewerId(int brewerUserId);
    Brewery getByBreweryId(int breweryId);
    Brewery update(Brewery brewery);
}