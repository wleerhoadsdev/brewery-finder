package com.techelevator.dao;

import com.techelevator.model.Beer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JdbcBeerDao implements BeerDao {

    @Override
    public Beer create(Beer beer) {

        // TODO: implement method
        return null;
    }

    @Override
    public List<Beer> getById(int beerId) {

        // TODO: implement method
        return null;
    }

    @Override
    public List<Beer> getByBreweryId(int breweryId) {

        // TODO: implement method
        return null;
    }

    @Override
    public Beer update(Beer beer) {

        // TODO: implement method
        return null;
    }

    @Override
    public void delete(int beerId) {

        // TODO: implement method
    }
}