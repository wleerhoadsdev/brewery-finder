package com.techelevator.controller;

import com.techelevator.controller.exception.EndpointException;
import com.techelevator.dao.BeerDao;
import com.techelevator.dao.UserDao;
import com.techelevator.dao.exception.RecordNotFoundException;
import com.techelevator.model.Beer;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
public class BeerController {

    private static final String MESSAGE_FORMAT_BAD_REQUEST_BEER_ID_PATH_VAR_REQ_BODY_MISMATCH
            = "The beer ID's in the path variable and request body do not match.";

    private UserDao userDao;
    private BeerDao beerDao;

    public BeerController(UserDao userDao, BeerDao beerDao) {
        this.userDao = userDao;
        this.beerDao = beerDao;
    }

    @ResponseStatus(code = HttpStatus.CREATED)
    @RequestMapping(value = "/brewery/{breweryId}/addbeer", method = RequestMethod.POST)
    public Beer createBeer(Principal principal, @PathVariable("breweryId") @NotNull Integer breweryId,
                           @Valid @RequestBody Beer beer) {
        try {
            return beerDao.create(beer);
        }
        catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        }
        catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(value = "/brewery/{breweryId}/beer/{beerId}", method = RequestMethod.GET)
    public Beer getBeerById(@PathVariable("breweryId") @NotNull Integer breweryId,
                            @PathVariable("beerId") @NotNull Integer beerId) {
        try {
            Beer beerById = beerDao.getBeerById(breweryId, beerId);
            return beerById;
        }
        catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        }
        catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(value = "/brewery/{breweryId}/beer", method = RequestMethod.GET)
    public List<Beer> getBeersByBreweryId(@PathVariable("breweryId") @NotNull Integer breweryId) {
        try {
            return beerDao.getByBreweryId(breweryId);
        }
        catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        }
        catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(value = "/brewery/{breweryId}/beer/{beerId}", method = RequestMethod.PUT)
    public Beer updateBeer(Principal principal, @PathVariable("breweryId") @NotNull Integer breweryId,
                           @PathVariable("beerId") @NotNull Integer beerId, @Valid @RequestBody Beer beer) {
//        if (!beerId.equals(beer.getBeerId())) {
//            throw new EndpointException(HttpStatus.BAD_REQUEST,
//                    MESSAGE_FORMAT_BAD_REQUEST_BEER_ID_PATH_VAR_REQ_BODY_MISMATCH);
//        }
        try {
            Beer beer1 = beerDao.updateBeer(beer, breweryId, beerId);
            return beer1;
        }
        catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        }
        catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(value = "/brewery/{breweryId}/beer/{beerId}", method = RequestMethod.DELETE)
    public void deleteBeer(Principal principal, @PathVariable("breweryId") @NotNull Integer breweryId,
                           @PathVariable @NotNull Integer beerId) {

        beerDao.deleteBeer(breweryId, beerId);
    }
}