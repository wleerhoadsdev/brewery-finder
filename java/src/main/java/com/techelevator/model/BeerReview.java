package com.techelevator.model;

import java.util.Date;

public class BeerReview {

    private int reviewId;
    private int beerId;
    private int authorUserId;
    private double rating;
    private String title;
    private String body;
    private Date createDateTime;
    private Date updateDateTime;

    public BeerReview(BeerReview beerReviewToCopyFrom){
    this.reviewId = beerReviewToCopyFrom.getReviewId();
    this.beerId = beerReviewToCopyFrom.getBeerId();
    this.authorUserId = beerReviewToCopyFrom.getAuthorUserId();
    this.rating = beerReviewToCopyFrom.getRating();
    this.title = beerReviewToCopyFrom.getTitle();
    this.body = beerReviewToCopyFrom.getBody();
    this.createDateTime = beerReviewToCopyFrom.getCreateDateTime();
    this.updateDateTime = beerReviewToCopyFrom.getUpdateDateTime();
    }

    public BeerReview(){}

    public BeerReview(int reviewId, int beerId, int authorUserId,
                      double rating, String title, String body, Date createDateTime, Date updateDateTime) {
        this.reviewId = reviewId;
        this.beerId = beerId;
        this.authorUserId = authorUserId;
        this.rating = rating;
        this.title = title;
        this.body = body;
        this.createDateTime = createDateTime;
        this.updateDateTime = updateDateTime;
    }

    public BeerReview(int beerId, int authorUserId, double rating, String title, String body, Date createDateTime, Date updateDateTime) {
        this.beerId = beerId;
        this.authorUserId = authorUserId;
        this.rating = rating;
        this.title = title;
        this.body = body;
        this.createDateTime = createDateTime;
        this.updateDateTime = updateDateTime;
    }

    public int getReviewId() {
        return reviewId;
    }

    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }

    public int getBeerId() {
        return beerId;
    }

    public void setBeerId(int beerId) {
        this.beerId = beerId;
    }

    public int getAuthorUserId() {
        return authorUserId;
    }

    public void setAuthorUserId(int authorUserId) {
        this.authorUserId = authorUserId;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Date getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(Date createDateTime) {
        this.createDateTime = createDateTime;
    }

    public Date getUpdateDateTime() {return updateDateTime;    }

    public void setUpdateDateTime(Date updateDateTime) {        this.updateDateTime = updateDateTime;    }
}