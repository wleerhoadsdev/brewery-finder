package com.techelevator.controller;

import com.techelevator.dao.BreweryDao;
import com.techelevator.dao.UserDao;
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

    private UserDao userDao;
    private BreweryDao breweryDao;

    public BreweryController(UserDao userDao, BreweryDao breweryDao) {
        this.userDao = userDao;
        this.breweryDao = breweryDao;
    }

    @ResponseStatus(code = HttpStatus.CREATED)
    @RequestMapping(value = "/brewery/addbrewery", method = RequestMethod.POST)
    public Brewery createBrewery(Principal principal, @Valid @RequestBody Brewery brewery) {

        // TODO: implement method
        return null;
    }

    @RequestMapping(value = "/brewery", method = RequestMethod.GET)
    public List<BreweryListItem> listAllBreweries() {

        // TODO: implement method
        return null;
    }

    @RequestMapping(value = "/brewery/{breweryId}", method = RequestMethod.GET)
    public Brewery getBreweryById(@PathVariable("breweryId") @NotNull Integer breweryId) {

        // TODO: implement method
        return null;
    }

    @RequestMapping(value = "/user/{brewerUserId}/brewery", method = RequestMethod.GET)
    public Brewery getBreweryByBrewerId(@PathVariable("brewerUserId") @NotNull Integer brewerUserId) {

        // TODO: implement method
        return null;
    }

    @RequestMapping(value = "/brewery/{breweryId}", method = RequestMethod.PUT)
    public Brewery updateBrewery(Principal principal, @PathVariable("breweryId") @NotNull Integer breweryId,
                                 @Valid @RequestBody Brewery brewery) {

        // TODO: implement method
        return null;
    }
}