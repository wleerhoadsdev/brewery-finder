package com.techelevator.dao;

import com.techelevator.model.BeerReview;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import javax.sql.DataSource;
import java.util.Date;


public class JdbcReviewDaoTest {
    private static final BeerReview REVIEW_1 = new BeerReview(1, 1,
            1, 5.0, "Title 1", "Body 1",
            new java.sql.Date(1970-01-20), new java.sql.Date(1970-01-20));
    private static final BeerReview REVIEW_2 = new BeerReview( 2,
            2, 5.0, "Title 1", "Body 2",
            new java.sql.Date(1970-01-20), new java.sql.Date(1970-01-20));

    private JdbcBeerReviewDao sut;

//    @Before
//    public void setup() {
//        sut = new JdbcBeerReviewDao(dataSource);}

    @Test
    public void getReviewByBeerId_returns_correct_number_of_revies(){
        int reviewsCreatedBySQLScript = 2;
        int review1 = sut.getReviewByBeerId(1, REVIEW_1.getBeerId()).size();
        Assert.assertEquals(reviewsCreatedBySQLScript, review1);



    }



}
