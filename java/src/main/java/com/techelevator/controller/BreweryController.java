package com.techelevator.controller;

import com.techelevator.controller.exception.EndpointException;
import com.techelevator.dao.exception.RecordNotFoundException;
import com.techelevator.model.Brewery;
import com.techelevator.model.BreweryListItem;
import com.techelevator.service.BreweryService;
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
public class BreweryController {

    private BreweryService breweryService;
    private static final String MESSAGE_FORMAT_BAD_REQUEST_BREWERY_ID_PATH_VAR_REQ_BODY_MISMATCH
            = "The brewery ID's in the path variable and request body do not match.";

    public BreweryController(BreweryService breweryService) {
        this.breweryService = breweryService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(code = HttpStatus.CREATED)
    @RequestMapping(value = "/brewery/addbrewery", method = RequestMethod.POST)
    public Brewery createBrewery(Principal principal, @Valid @RequestBody Brewery brewery) {
        try {
            return breweryService.createBrewery(brewery);
        } catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (IllegalArgumentException e) {
            throw new EndpointException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(value = "/brewery", method = RequestMethod.GET)
    public List<BreweryListItem> listAllBreweries() {
        return breweryService.listAllBreweries();
    }

    @RequestMapping(value = "/brewery/{breweryId}", method = RequestMethod.GET)
    public Brewery getBreweryById(@PathVariable("breweryId") @NotNull Integer breweryId) {
        try {
            return breweryService.getBreweryById(breweryId);
        } catch (IllegalArgumentException e) {
            throw new EndpointException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(value = "/user/{brewerUserId}/brewery", method = RequestMethod.GET)
    public Brewery getBreweryByBrewerId(@PathVariable("brewerUserId") @NotNull Integer brewerUserId) {
        try {
            return breweryService.getBreweryByBrewerId(brewerUserId);
        } catch (IllegalArgumentException e) {
            throw new EndpointException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'BREWER')")
    @RequestMapping(value = "/brewery/{breweryId}", method = RequestMethod.PUT)
    public Brewery updateBrewery(Principal principal, @PathVariable("breweryId") @NotNull Integer breweryId,
                                 @Valid @RequestBody Brewery brewery) {
        if (!breweryId.equals(brewery.getBreweryId())) {
            throw new EndpointException(HttpStatus.BAD_REQUEST,
                    MESSAGE_FORMAT_BAD_REQUEST_BREWERY_ID_PATH_VAR_REQ_BODY_MISMATCH);
        }

        try {
            return breweryService.updateBrewery(principal == null ? null : principal.getName(), brewery);
        } catch (UnsupportedOperationException | IllegalArgumentException e) {
            throw new EndpointException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (AccessDeniedException e) {
            throw new EndpointException(HttpStatus.FORBIDDEN, e.getMessage());
        } catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}