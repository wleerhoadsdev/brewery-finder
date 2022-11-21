package com.techelevator.service;

import com.techelevator.dao.BreweryDao;
import com.techelevator.dao.UserDao;
import com.techelevator.dao.exception.RecordNotFoundException;
import com.techelevator.model.Brewery;
import com.techelevator.model.BreweryListItem;
import com.techelevator.model.User;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BreweryService {

    private static final String MESSAGE_FORMAT_USER_ALREADY_OWNS_A_BREWERY
            = "The user with ID %d already owns a brewery. That brewery has an ID of %d.";

    private static final String MESSAGE_FORMAT_ADMIN_USER_CANT_BECOME_BREWER
            = "The user with ID %d is an administrator. Administrators cannot become brewers.";

    private static final String MESSAGE_FORMAT_NOT_BREWERY_OWNER_OR_ADMIN
            = "You must be an administrator or the owner of brewery with ID=%d in order to modify it.";

    private static final String MESSAGE_FORMAT_CHANGING_OF_BREWERY_OWNER_NOT_SUPPORTED
            = "The changing of brewery owners is not supported.";

    private UserDao userDao;
    private BreweryDao breweryDao;

    BreweryService(UserDao userDao, BreweryDao breweryDao) {
        this.userDao = userDao;
        this.breweryDao = breweryDao;
    }

    public Brewery createBrewery(Brewery brewery) {

        try {
            // make sure user to become brewery owner exists, is not an admin, and doesn't already own a brewery
            User breweryOwnerUser = userDao.getUserById(brewery.getBreweryOwnerUserId());
            if (breweryOwnerUser.hasAuthority("ROLE_ADMIN")) {
                throw new IllegalArgumentException(String.format(
                        MESSAGE_FORMAT_ADMIN_USER_CANT_BECOME_BREWER, breweryOwnerUser.getId()));
            }

            Brewery alreadyOwnedBrewery;
            try {
                alreadyOwnedBrewery = breweryDao.getByBrewerId(breweryOwnerUser.getId());
                throw new IllegalArgumentException(String.format(
                        MESSAGE_FORMAT_USER_ALREADY_OWNS_A_BREWERY, breweryOwnerUser.getId(),
                        alreadyOwnedBrewery.getBreweryId()));
            } catch (RecordNotFoundException e) {
                // brewery does not already own a brewery, which is what we want
            }
            catch (Exception e) {
                throw e;
            }

            // change that user's role to that of a brewer
            breweryOwnerUser.setAuthorities("ROLE_BREWER");
            userDao.update(breweryOwnerUser);

            // create the brewery
            return breweryDao.create(brewery);
        } catch (Exception e) {
            throw e;
        }
    }
    public List<BreweryListItem> listAllBreweries() {
        return breweryDao.listAll();
    }

    public Brewery getBreweryById(Integer breweryId) {
        return breweryDao.getByBreweryId(breweryId);
    }

    public Brewery getBreweryByBrewerId(Integer brewerUserId) {
        return breweryDao.getByBrewerId(brewerUserId);
    }

    public Brewery updateBrewery(String username, Brewery brewery) {

        Brewery currentBrewery = breweryDao.getByBreweryId(brewery.getBreweryId());

        User user = username == null ? null : userDao.findByUsername(username);
        if (user == null || (user.getId() != currentBrewery.getBreweryOwnerUserId()
                && !user.hasAuthority("ROLE_ADMIN"))) {
            throw new AccessDeniedException(String.format(
                    MESSAGE_FORMAT_NOT_BREWERY_OWNER_OR_ADMIN, brewery.getBreweryId()));
        }

        if (currentBrewery.getBreweryOwnerUserId() != brewery.getBreweryOwnerUserId()) {
            throw new UnsupportedOperationException(MESSAGE_FORMAT_CHANGING_OF_BREWERY_OWNER_NOT_SUPPORTED);
        }

        return breweryDao.update(brewery);
    }
}