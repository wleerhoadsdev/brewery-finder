package com.techelevator.dao;

import com.techelevator.model.BeerAverageRating;
import com.techelevator.model.BeerReview;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class JdbcBeerReviewDao implements BeerReviewDao {
    private static final String MESSAGE_COULD_NOT_CREATE_REVIEW_RECORD = "Could not create review record.";
    private static final String MESSAGE_COULD_NOT_DELETE_REVIEW_RECORD = "Could not delete review record.";

    public JdbcTemplate jdbcTemplate;
    public JdbcBeerReviewDao(DataSource dataSource){this.jdbcTemplate = new JdbcTemplate(dataSource);}

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
        }
        return listReview;
    }

    @Override
    public Double getBeerAverageRating(int beerId) {
        String reviewSql = String.format("SELECT AVG(rating) FROM beer_review WHERE beer_id = ?", beerId);
        SqlRowSet results = jdbcTemplate.queryForRowSet(reviewSql, beerId);
        Double avgRating = 0.0;
        while (results.next()){
            avgRating = results.getDouble("AVG");
        }
        return avgRating;
    }

    @Override
    public List<BeerAverageRating> getBeersAverageRatings(int breweryId) {
        List<BeerAverageRating> listRating = new ArrayList<>();
        String reviewSql = String.format("SELECT b.beer_id, AVG(rating) as avg_rating " +
                        "FROM beer as b JOIN beer_review as r " +
                        "ON b.beer_id = r.beer_id " +
                        "WHERE b.brewery_id = ? " +
                        "GROUP BY b.beer_id " +
                        "ORDER BY avg_rating");
        SqlRowSet result = jdbcTemplate.queryForRowSet(reviewSql, breweryId);
        while (result.next()){
            BeerAverageRating avg_rating = mapRowToBeerAverageRating(result);
            listRating.add(avg_rating);
        }
        return listRating;
    }

    @Override
    public int deleteReviewsByBeerId(Integer beerId) {
        return jdbcTemplate.update("DELETE FROM beer_review WHERE beer_id = ?", beerId);
    }

    private BeerAverageRating mapRowToBeerAverageRating(SqlRowSet rs){
        BeerAverageRating beerAverageRating = new BeerAverageRating();
        beerAverageRating.setBeerId(rs.getInt("beer_id"));
//        beerAverageRating.setBeerName(rs.getString("beer_name"));
        beerAverageRating.setAverageRating(rs.getDouble("avg_rating"));
        return beerAverageRating;
    }

    //for testing purpose (can not delete beer until removed constrains)
    public int deleteReview(int reviewId){
        String review_delete_sql = "DELETE FROM beer_review WHERE review_id = ?";
        int numberOfRowDeleted = jdbcTemplate.update(review_delete_sql, reviewId);
        if (numberOfRowDeleted != 1) {
            throw new RuntimeException(MESSAGE_COULD_NOT_DELETE_REVIEW_RECORD);
        }
        return numberOfRowDeleted;
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