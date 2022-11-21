package com.techelevator.dao;

import com.techelevator.model.BeerType;

import java.util.List;

public interface BeerTypeDao {
    List<BeerType> listAll();
}