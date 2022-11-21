package com.techelevator.controller;

import com.techelevator.dao.BeerTypeDao;
import com.techelevator.model.BeerType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class BeerTypeController {

    private BeerTypeDao beerTypeDao;

    public BeerTypeController(BeerTypeDao beerTypeDao) {
        this.beerTypeDao = beerTypeDao;
    }

    @RequestMapping(value = "/beertype", method = RequestMethod.GET)
    public List<BeerType> listAllBeerTypes() {
        return beerTypeDao.listAll();
    }
}