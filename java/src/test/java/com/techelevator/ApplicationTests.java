package com.techelevator;

import com.techelevator.controller.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class ApplicationTests {

    @Autowired
    private AuthenticationController authenticationController;

    @Autowired
    private BeerController beerController;

    @Autowired
    private BeerReviewController beerReviewController;

    @Autowired
    private BeerTypeController beerTypeController;

    @Autowired
    private BreweryController breweryController;

    @Autowired
    private UserController userController;

    @Test
    void contextLoads() {
        assertThat(authenticationController).isNotNull();
        assertThat(beerController).isNotNull();
        assertThat(beerReviewController).isNotNull();
        assertThat(beerTypeController).isNotNull();
        assertThat(breweryController).isNotNull();
        assertThat(userController).isNotNull();
    }

}
