package com.techelevator.dao;

import com.techelevator.model.BeerAverageRating;
import com.techelevator.model.BeerReview;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class JdbcBeerReviewDao implements BeerReviewDao {
    private static final String MESSAGE_COULD_NOT_CREATE_REVIEW_RECORD = "Could not create review record.";

    private JdbcTemplate jdbcTemplate;
    public JdbcBeerReviewDao(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}

    @Override
    public BeerReview create(BeerReview beerReview) {
        try {
                BeerReview newReview = new BeerReview(beerReview);
                String reviewCreateSql = "INSERT INTO beer_review (author_id, beer_id, rating, title, review_body, created_date, updated_date)  " +
                    " VALUES(?,?,?,?,?,?,?)" +
                    " RETURNING review_id";
                newReview.setReviewId(jdbcTemplate.queryForObject(reviewCreateSql, Integer.class,
                newReview.getAuthorUserId(),
                newReview.getBeerId(),
                newReview.getRating(),
                newReview.getTitle(),
                newReview.getBody(),
                newReview.getCreateDateTime(),
                newReview.getUpdateDateTime()));
            return newReview;
        } catch (DataAccessException e) {
            throw new RuntimeException(MESSAGE_COULD_NOT_CREATE_REVIEW_RECORD, e);
        }
    }

    @Override
    public List<BeerReview> getReviewByBeerId(Integer breweryId, Integer beerId) {
        List<BeerReview> listReview = new ArrayList<>();
        List<Double> rating = new ArrayList<>();
        String reviewSql = String.format("SELECT review_id, author_id, beer_id, rating, title, " +
                " review_body, created_date, updated_date from beer_review WHERE beer_id = ? ", beerId);
        SqlRowSet result = jdbcTemplate.queryForRowSet(reviewSql, beerId);
        while (result.next()){

            BeerReview review = mapRowToBeerReview(result);
            listReview.add(review);
            rating.add(review.getRating());
            System.out.println("rating: "+review.getRating());
        }
        return listReview;
    }

    @Override
    public Double getBeerAverageRating(int beerId) {
//        List<BeerReview> listReview = new ArrayList<>();
//        List<Double> rating = new ArrayList<>();
//        String reviewSql = String.format("SELECT review_id, author_id, beer_id, rating, title, " +
//                " review_body, created_date, updated_date from beer_review WHERE beer_id = ? ", beerId);
//        SqlRowSet result = jdbcTemplate.queryForRowSet(reviewSql, beerId);
//        while (result.next()){
//
//            BeerReview review = mapRowToBeerReview(result);
//            listReview.add(review);
//            rating.add(review.getRating());
//            System.out.println("rating: "+review.getRating());
//        }
        return null;
    }

    @Override
    public List<BeerAverageRating> getBeersAverageRatings(int breweryId) {

        // TODO: implement method
        return null;
    }

    private BeerReview mapRowToBeerReview(SqlRowSet rs){
        BeerReview beerReview = new BeerReview();
        beerReview.setReviewId(rs.getInt("review_id"));
        beerReview.setBeerId(rs.getInt("beer_id"));
        beerReview.setAuthorUserId(rs.getInt("author_id"));
        beerReview.setRating(rs.getDouble("rating"));
        beerReview.setTitle(rs.getString("title"));
        beerReview.setBody(rs.getString("review_body"));
        beerReview.setCreateDateTime(rs.getTimestamp("created_date"));
        beerReview.setUpdateDateTime(rs.getTimestamp("updated_date"));
        return beerReview;
    }
}