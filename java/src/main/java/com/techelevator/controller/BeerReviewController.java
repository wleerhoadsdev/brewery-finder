package com.techelevator.controller;

import com.techelevator.controller.exception.EndpointException;
import com.techelevator.dao.BeerReviewDao;
import com.techelevator.dao.UserDao;
import com.techelevator.dao.exception.RecordNotFoundException;
import com.techelevator.model.BeerAverageRating;
import com.techelevator.model.BeerReview;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
public class BeerReviewController {

    private UserDao userDao;
    private BeerReviewDao beerReviewDao;

    public BeerReviewController(UserDao userDao, BeerReviewDao beerReviewDao) {
        this.userDao = userDao;
        this.beerReviewDao = beerReviewDao;
    }

    @ResponseStatus(code = HttpStatus.CREATED)
    @RequestMapping(value = "/brewery/{breweryId}/beer/{beerId}/review", method = RequestMethod.POST)
    public BeerReview createBeerReview(Principal principal, @PathVariable("breweryId") @NotNull Integer breweryId,
                                       @PathVariable("beerId") @NotNull Integer beerId,
                                       @Valid @RequestBody BeerReview beerReview) {

        try {
            return beerReviewDao.create(beerReview);
        }
        catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        }
        catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

    }

    @RequestMapping(value = "/brewery/{breweryId}/beer/{beerId}/review", method = RequestMethod.GET)
    public List<BeerReview> getBeerReviewsByBeerId(@PathVariable("breweryId") @NotNull Integer breweryId,
                                                   @PathVariable("beerId") @NotNull Integer beerId) {

        try {
            return beerReviewDao.getReviewByBeerId(breweryId, beerId);

        }
        catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        }
        catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(value = "/brewery/{breweryId}/beer/{beerId}/avgrating", method = RequestMethod.GET)
    public Double getBeerAverageRating(@PathVariable("breweryId") @NotNull Integer breweryId,
                                       @PathVariable("beerId") @NotNull Integer beerId) {

        // TODO: implement method
        return null;
    }

    @RequestMapping(value = "/brewery/{breweryId}/beer/avgrating", method = RequestMethod.GET)
    public List<BeerAverageRating> getBeersAverageRatings(@PathVariable("breweryId") @NotNull Integer breweryId) {

        // TODO: implement method
        return null;
    }
}