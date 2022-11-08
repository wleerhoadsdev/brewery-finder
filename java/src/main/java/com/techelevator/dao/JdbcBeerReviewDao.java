package com.techelevator.dao;

import com.techelevator.model.BeerAverageRating;
import com.techelevator.model.BeerReview;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JdbcBeerReviewDao implements BeerReviewDao {
    @Override
    public BeerReview create(BeerReview beerReview) {

        // TODO: implement method
        return null;
    }

    @Override
    public List<BeerReview> getByBeerId(int beerId) {

        // TODO: implement method
        return null;
    }

    @Override
    public Double getBeerAverageRating(int beerId) {

        // TODO: implement method
        return null;
    }

    @Override
    public List<BeerAverageRating> getBeersAverageRatings(int breweryId) {

        // TODO: implement method
        return null;
    }
}