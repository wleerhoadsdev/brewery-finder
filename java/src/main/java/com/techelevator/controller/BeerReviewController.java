package com.techelevator.controller;

import com.techelevator.controller.exception.EndpointException;
import com.techelevator.dao.BeerDao;
import com.techelevator.dao.BeerReviewDao;
import com.techelevator.dao.exception.RecordNotFoundException;
import com.techelevator.model.BeerAverageRating;
import com.techelevator.model.BeerReview;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
public class BeerReviewController {
    private static final String MESSAGE_FORMAT_BAD_REQUEST_BEER_ID_PATH_VAR_REQ_BODY_MISMATCH
            = "The beer ID's in the path variable and request body do not match.";

    private BeerDao beerDao;
    private BeerReviewDao beerReviewDao;

    public BeerReviewController(BeerDao beerDao, BeerReviewDao beerReviewDao) {
        this.beerDao = beerDao;
        this.beerReviewDao = beerReviewDao;
    }

    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(code = HttpStatus.CREATED)
    @RequestMapping(value = "/brewery/{breweryId}/beer/{beerId}/review", method = RequestMethod.POST)
    public BeerReview createBeerReview(Principal principal, @PathVariable("breweryId") @NotNull Integer breweryId,
                                       @PathVariable("beerId") @NotNull Integer beerId,
                                       @Valid @RequestBody BeerReview beerReview) {

        if (!beerId.equals(beerReview.getBeerId())) {
            throw new EndpointException(HttpStatus.BAD_REQUEST,
                    MESSAGE_FORMAT_BAD_REQUEST_BEER_ID_PATH_VAR_REQ_BODY_MISMATCH);
        }

        try {
            verifyBeerBelongsToBrewery(breweryId, beerId);
            return beerReviewDao.create(beerReview);
        } catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(value = "/brewery/{breweryId}/beer/{beerId}/review", method = RequestMethod.GET)
    public List<BeerReview> getBeerReviewsByBeerId(@PathVariable("breweryId") @NotNull Integer breweryId,
                                                   @PathVariable("beerId") @NotNull Integer beerId) {

        try {
            return beerReviewDao.getReviewByBeerId(breweryId, beerId);

        } catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(value = "/brewery/{breweryId}/beer/{beerId}/avgrating", method = RequestMethod.GET)
    public Double getBeerAverageRating(@PathVariable("breweryId") @NotNull Integer breweryId,
                                       @PathVariable("beerId") @NotNull Integer beerId) {

        Double avgRating = beerReviewDao.getBeerAverageRating(beerId);
        return avgRating;
    }

    @RequestMapping(value = "/brewery/{breweryId}/beer/avgrating", method = RequestMethod.GET)
    public List<BeerAverageRating> getBeersAverageRatings(@PathVariable("breweryId") @NotNull Integer breweryId) {

        try {
            return beerReviewDao.getBeersAverageRatings(breweryId);

        } catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    //for testing purposes
    @RequestMapping(value = "/beer/review/{reviewId}", method = RequestMethod.DELETE)
    public int deleteReview(@PathVariable("reviewId") @NotNull Integer reviewID) {

        int deletedRows = beerReviewDao.deleteReview(reviewID);
        return deletedRows;
    }

    private void verifyBeerBelongsToBrewery(Integer breweryId, Integer beerId) {
        // throws RecordNotFound exception if beer does not exist or does not have matching brewery ID
        beerDao.getBeerById(breweryId, beerId);
    }
}