package com.techelevator.dao;

import com.techelevator.model.Beer;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class JdbcBeerDaoTest extends BaseDaoTests  {

    private static final Beer BEER_1 = new Beer("Blonde", 1, "light blonde",
        5.9,1, true, "https://images_20.com");
    private static final Beer BEER_2 = new Beer("Blonde 20", 1, "Blonde 20",
            5.9,1, true, "https://images_url.com");

    private JdbcBeerDao sut;

//  to delete review as constraint before delete beer
    private JdbcBeerReviewDao jdbcBeerReviewDao;

    @Before
    public void setup() {sut = new JdbcBeerDao(dataSource);
        jdbcBeerReviewDao = new JdbcBeerReviewDao(dataSource);}


    @Test
    public void getBeerById_return_correct_info(){
        Beer beer1 = sut.getBeerById(BEER_1.getBreweryId(),1);
        assertBeerMatch(beer1, BEER_1);
    }

    @Test
    public void createBeer_creates_beer(){
        Beer createdBeer = sut.create(BEER_2);
        assertBeerMatch(BEER_2, createdBeer );
    }

    @Test
    public void updateBeer_updates_beer(){
        Beer beerToUpdate = sut.getBeerById(BEER_1.getBreweryId(), 1);
        beerToUpdate.setName("Stella Updated");
        sut.updateBeer(beerToUpdate, beerToUpdate.getBreweryId(), beerToUpdate.getBeerId());
        Beer retrievedBeer = sut.getBeerById(BEER_1.getBreweryId(), beerToUpdate.getBeerId());
        assertBeerMatch(beerToUpdate,retrievedBeer );
    }

    @Test
    public void getByBreweryID_returns_correct_number_of_beers(){
        int beersCreatedBySQLScript = 1;
        int numberOfBeers = sut.getByBreweryId(1).size();
        Assert.assertEquals(beersCreatedBySQLScript, numberOfBeers);
    }

    @Test
    public void deleteBeer_deletes_beer(){
        //deleting constrain first. Review with id 1 created in sql script
        int reviewIdCreatedWithScript = 1;
        jdbcBeerReviewDao.deleteReview(reviewIdCreatedWithScript);
        sut.deleteBeer(BEER_1.getBreweryId(),1);
        //beer actually deleted, but question how to veiry it is deleted
        Beer retrievedBeer = sut.getBeerById(BEER_1.getBreweryId(), 1);
        Assert.assertNull(retrievedBeer);

    }

    private void assertBeerMatch(Beer expected, Beer actual){
        Assert.assertEquals(expected.getBreweryId(), actual.getBreweryId());
        Assert.assertEquals(expected.getName(), actual.getName());
        Assert.assertEquals(expected.getDescription(), actual.getDescription());
        Assert.assertEquals(expected.getAbv(), actual.getAbv());
        Assert.assertEquals(expected.getTypeId(), actual.getTypeId());
        Assert.assertEquals(expected.getIsActive(), actual.getIsActive());
        Assert.assertEquals(expected.getImageUrl(), actual.getImageUrl());
    }


}
