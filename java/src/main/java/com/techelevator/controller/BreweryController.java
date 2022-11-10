package com.techelevator.controller;

import com.techelevator.controller.exception.EndpointException;
import com.techelevator.dao.BreweryDao;
import com.techelevator.dao.UserDao;
import com.techelevator.dao.exception.RecordNotFoundException;
import com.techelevator.model.Brewery;
import com.techelevator.model.BreweryListItem;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
public class BreweryController {

    private static final String MESSAGE_FORMAT_BAD_REQUEST_BREWERY_ID_PATH_VAR_REQ_BODY_MISMATCH
            = "The brewery ID's in the path variable and request body do not match.";

    private UserDao userDao;
    private BreweryDao breweryDao;

    public BreweryController(UserDao userDao, BreweryDao breweryDao) {
        this.userDao = userDao;
        this.breweryDao = breweryDao;
    }

    @ResponseStatus(code = HttpStatus.CREATED)
    @RequestMapping(value = "/brewery/addbrewery", method = RequestMethod.POST)
    public Brewery createBrewery(Principal principal, @Valid @RequestBody Brewery brewery) {
        try {
            return breweryDao.create(brewery);
        }
        catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        }
        catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(value = "/brewery", method = RequestMethod.GET)
    public List<BreweryListItem> listAllBreweries() {
        return breweryDao.listAll();
    }

    @RequestMapping(value = "/brewery/{breweryId}", method = RequestMethod.GET)
    public Brewery getBreweryById(@PathVariable("breweryId") @NotNull Integer breweryId) {
        try {
            return breweryDao.getByBreweryId(breweryId);
        }
        catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        }
        catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(value = "/user/{brewerUserId}/brewery", method = RequestMethod.GET)
    public Brewery getBreweryByBrewerId(@PathVariable("brewerUserId") @NotNull Integer brewerUserId) {
        try {
            return breweryDao.getByBrewerId(brewerUserId);
        }
        catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        }
        catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @RequestMapping(value = "/brewery/{breweryId}", method = RequestMethod.PUT)
    public Brewery updateBrewery(Principal principal, @PathVariable("breweryId") @NotNull Integer breweryId,
                                 @Valid @RequestBody Brewery brewery) {
        if (!breweryId.equals(brewery.getBreweryId())) {
            throw new EndpointException(HttpStatus.BAD_REQUEST,
                MESSAGE_FORMAT_BAD_REQUEST_BREWERY_ID_PATH_VAR_REQ_BODY_MISMATCH);
        }

        // TODO: When adding user permission support to controller, also fail the request here with
        // HttpStatus.UNAUTHORIZED if the user is neither an administrator nor the brewery owner. This will involve
        // using breweryDao to query up the brewery based on breweryId and also the userDao to query up the user based
        // on the username indicated by principal.getName(), then checking to see if
        // brewery.getBreweryOwnerUserId() == user.getId().

        try {
            return breweryDao.update(brewery);
        }
        catch (RecordNotFoundException e) {
            throw new EndpointException(HttpStatus.NOT_FOUND, e.getMessage());
        }
        catch (Exception e) {
            throw new EndpointException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}