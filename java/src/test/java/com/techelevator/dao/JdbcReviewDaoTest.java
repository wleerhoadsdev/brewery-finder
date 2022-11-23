package com.techelevator.dao;

import com.techelevator.model.Beer;
import com.techelevator.model.BeerAverageRating;
import com.techelevator.model.BeerReview;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import java.util.List;


public class JdbcReviewDaoTest extends BaseDaoTests{
    private static final BeerReview REVIEW_1 = new BeerReview(1,
            2, 5.0, "Title 1", "Body 1",
            new java.sql.Date(1970-01-20), new java.sql.Date(1970-01-20));
    private static final BeerReview REVIEW_2 = new BeerReview( 2,
            2, 4.5, "Title 2", "Body 2",
            new java.sql.Date(1970-01-20), new java.sql.Date(1970-01-20));
    private static final BeerReview REVIEW_3 = new BeerReview(1,
            2, 2.0, "Title 1", "Body 1",
            new java.sql.Date(1970-01-20), new java.sql.Date(1970-01-20));

    private JdbcBeerReviewDao sut;

    @Before
    public void setup() {sut = new JdbcBeerReviewDao(dataSource);}

    @Test
    public void create_method_creates_review(){
        BeerReview created = sut.create(REVIEW_1);
        assertReviewMatch(REVIEW_1, created);
    }

    @Test
    public void getReviewByBeerId_returns_correct_number_of_reviews(){
        int reviewsCreatedBySQLScript = 1;
        List<BeerReview> review1 = sut.getReviewByBeerId(1,REVIEW_1.getBeerId());
        Assert.assertEquals(reviewsCreatedBySQLScript, review1.size());
    }

    @Test
    public void getBeerAverageRating_returns_correct_rating(){
        Double rating = sut.getBeerAverageRating(REVIEW_2.getBeerId());
        Double ratingCreatedByScript = 4.5;
        Assert.assertEquals(ratingCreatedByScript, rating);
    }

    @Test
    public void getBeersAverageRatings_returns_correct_ratings(){
//        TODO: get avg rating, then create another rating and verify avg rating changed
        //get average rating with beer created with script
        List<BeerAverageRating> listRatings = sut.getBeersAverageRatings(1);
        Double ratingCreatedByScript = 4.5;
//        Assert.assertEquals(1,listRatings.size());
//        System.out.println("########## before test "+ listRatings.size());
        Assert.assertEquals(ratingCreatedByScript, listRatings.get(0).getAverageRating(), 0);
//        //created another beerReview to verify rating changed
//        BeerReview created = sut.create(REVIEW_3);
//        System.out.println("########## after test "+ listRatings.size());
//        Assert.assertEquals(2,listRatings.size());
//        listRatings = sut.getBeersAverageRatings(1);
//        Assert.assertEquals(4.75, listRatings.get(1).getAverageRating(), 0);
    }

    @Test
    public void deleteReview_deletes_reviews(){
        List<BeerReview> listBeforeDeletion = sut.getReviewByBeerId(1, 1);
        sut.deleteReview(1);
        List<BeerReview> listAfterDeletion = sut.getReviewByBeerId(1, 1);
        Assert.assertNotEquals(listBeforeDeletion.size(), listAfterDeletion.size());
    }

    private void assertReviewMatch(BeerReview expected, BeerReview actual){
        Assert.assertEquals(expected.getAuthorUserId(), actual.getAuthorUserId());
        Assert.assertEquals(expected.getRating(), actual.getRating(), 0);
        Assert.assertEquals(expected.getTitle(), actual.getTitle());
        Assert.assertEquals(expected.getBody(), actual.getBody());
        Assert.assertEquals(expected.getCreateDateTime(), actual.getCreateDateTime());
        Assert.assertEquals(expected.getUpdateDateTime(), actual.getUpdateDateTime());
    }
}
