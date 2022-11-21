package com.techelevator.dao;

import com.techelevator.model.BeerAverageRating;
import com.techelevator.model.BeerReview;

import java.util.List;

public interface BeerReviewDao {
    BeerReview create(BeerReview beerReview);
    List<BeerReview> getReviewByBeerId(Integer breweryId, Integer beerId);
    Double getBeerAverageRating(int beerId);
    List<BeerAverageRating> getBeersAverageRatings(int breweryId);
    //delete for testing purpose since we need
    //to delete constraints before delete beer
    int deleteReview(int reviewId);
    int deleteReviewsByBeerId(Integer beerId);
}