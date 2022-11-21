package com.techelevator.controller;

import com.techelevator.controller.exception.EndpointException;
import com.techelevator.dao.BeerDao;
import com.techelevator.dao.BeerReviewDao;
import com.techelevator.dao.BreweryDao;
import com.techelevator.dao.UserDao;
import com.techelevator.dao.exception.RecordNotFoundException;
import com.techelevator.model.Beer;
import com.techelevator.model.Brewery;
import com.techelevator.model.User;

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
public class BeerController {
    private static final String MESSAGE_COULD_NOT_FIND_BEER_BY_ID   = "Could not find beer";
    private static final String MESSAGE_FORMAT_BAD_REQUEST_BREWERY_ID_PATH_VAR_REQ_BODY_MISMATCH
            = "The brewery ID's in the path variable and request body do not match.";
    private static final String MESSAGE_FORMAT_BAD_REQUEST_BEER_ID_PATH_VAR_REQ_BODY_MISMATCH
            = "The beer ID's in the path variable and request body do not match.";
    private static final String MESSAGE_FORMAT_NOT_BREWERY_OWNER_OR_ADMIN
            = "You must be an administrator or the owner of brewery with ID=%d to perform this operation.";

    private UserDao userDao;
    private BreweryDao breweryDao;
    private BeerDao beerDao;
    private BeerReviewDao beerReviewDao;

    public BeerController(UserDao userDao, BreweryDao breweryDao, BeerDao beerDao, BeerReviewDao beerReviewDao) {
        this.userDao = userDao;
        this.breweryDao = breweryDao;
        this.beerDao = beerDao;
        this.beerReviewDao = beerReviewDao;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'BREWER')")
    @ResponseStatus(code = HttpStatus.CREATED)
    @RequestMapping(value = "/brewery/{breweryId}/addbeer", method = RequestMethod.POST)
    public Beer createBeer(Principal principal, @PathVariable("breweryId") @NotNull Integer breweryId,
                           @Valid @RequestBody Beer beer) {
        if (!breweryId.equals(beer.getBreweryId())) {
            throw new EndpointException(HttpStatus.BAD_REQUEST,
                    MESSAGE_FORMAT_BAD_REQUEST_BREWERY_ID_PATH_VAR_REQ_BODY_MISMATCH);
        }

        try {
            verifyApiCallerIsBreweryOwnerOrAdmin(principal, breweryId);
            return beerDao.create(beer);
        } catch (AccessDeniedException e) {
            throw new EndpointException(HttpStatus.FORBIDDEN, e.getMessage());
        } catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(value = "/brewery/{breweryId}/beer/{beerId}", method = RequestMethod.GET)
    public Beer getBeerById(@PathVariable("breweryId") @NotNull Integer breweryId,
                            @PathVariable("beerId") @NotNull Integer beerId) {
        try {
            Beer beerById = beerDao.getBeerById(breweryId, beerId);
            if (beerById == null){
                throw new RecordNotFoundException(MESSAGE_COULD_NOT_FIND_BEER_BY_ID);
            }
            return beerById;
        } catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(value = "/brewery/{breweryId}/beer", method = RequestMethod.GET)
    public List<Beer> getBeersByBreweryId(@PathVariable("breweryId") @NotNull Integer breweryId) {
        try {
            return beerDao.getByBreweryId(breweryId);
        } catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'BREWER')")
    @RequestMapping(value = "/brewery/{breweryId}/beer/{beerId}", method = RequestMethod.PUT)
    public Beer updateBeer(Principal principal, @PathVariable("breweryId") @NotNull Integer breweryId,
                           @PathVariable("beerId") @NotNull Integer beerId, @Valid @RequestBody Beer beer) {

        if (!breweryId.equals(beer.getBreweryId())) {
            throw new EndpointException(HttpStatus.BAD_REQUEST,
                    MESSAGE_FORMAT_BAD_REQUEST_BREWERY_ID_PATH_VAR_REQ_BODY_MISMATCH);
        }
        if (!beerId.equals(beer.getBeerId())) {
            throw new EndpointException(HttpStatus.BAD_REQUEST,
                    MESSAGE_FORMAT_BAD_REQUEST_BEER_ID_PATH_VAR_REQ_BODY_MISMATCH);
        }

        try {
            verifyApiCallerIsBreweryOwnerOrAdmin(principal, breweryId);
            Beer beer1 = beerDao.updateBeer(beer, breweryId, beerId);
            return beer1;
        } catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (AccessDeniedException e) {
            throw new EndpointException(HttpStatus.FORBIDDEN, e.getMessage());
        } catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'BREWER')")
    @RequestMapping(value = "/brewery/{breweryId}/beer/{beerId}", method = RequestMethod.DELETE)
    public void deleteBeer(Principal principal, @PathVariable("breweryId") @NotNull Integer breweryId,
                           @PathVariable @NotNull Integer beerId) {

        try {
            verifyApiCallerIsBreweryOwnerOrAdmin(principal, breweryId);
            beerReviewDao.deleteReviewsByBeerId(beerId);
            beerDao.deleteBeer(breweryId, beerId);
        } catch (EndpointException e) {
            throw e;
        } catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (AccessDeniedException e) {
            throw new EndpointException(HttpStatus.FORBIDDEN, e.getMessage());
        } catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public void verifyApiCallerIsBreweryOwnerOrAdmin(Principal principal, Integer breweryId) {

        User user = principal == null ? null : userDao.findByUsername(principal.getName());
        Brewery brewery = breweryDao.getByBreweryId(breweryId);
        if (user == null || (user.getId() != brewery.getBreweryOwnerUserId()
                && !user.hasAuthority("ROLE_ADMIN"))) {
            throw new AccessDeniedException(String.format(
                    MESSAGE_FORMAT_NOT_BREWERY_OWNER_OR_ADMIN, brewery.getBreweryId()));
        }
    }
}