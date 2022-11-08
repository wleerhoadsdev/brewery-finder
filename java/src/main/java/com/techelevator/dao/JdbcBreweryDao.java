package com.techelevator.dao;

import com.techelevator.model.Brewery;
import com.techelevator.model.BreweryListItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JdbcBreweryDao implements BreweryDao {
    @Override
    public Brewery create(Brewery brewery) {

        // TODO: implement method
        return null;
    }

    @Override
    public List<BreweryListItem> listAll() {

        // TODO: implement method
        return null;
    }

    @Override
    public Brewery getByBrewerId(int brewerUserId) {

        // TODO: implement method
        return null;
    }

    @Override
    public Brewery getByBreweryId(int breweryId) {

        // TODO: implement method
        return null;
    }

    @Override
    public Brewery update(Brewery brewery) {

        // TODO: implement method
        return null;
    }
}