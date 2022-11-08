package com.techelevator.controller;

import com.techelevator.dao.UserDao;
import com.techelevator.model.UserBreweryListItem;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    private UserDao userDao;

    public UserController(UserDao userDao) {
        this.userDao = userDao;
    }

    @RequestMapping(value = "/usersbreweries", method = RequestMethod.GET)
    public List<UserBreweryListItem> listAllUsersAndTheirBreweries() {

        // TODO: implement method
        return null;
    }
}