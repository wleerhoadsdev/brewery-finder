package com.techelevator.dao;

import com.techelevator.dao.exception.RecordNotFoundException;
import com.techelevator.model.Beer;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;
import javax.sql.DataSource;

import java.util.ArrayList;
import java.util.List;

@Service
public class JdbcBeerDao implements BeerDao {
    private static final String MESSAGE_COULD_NOT_CREATE_BEER_RECORD = "Could not create beer record.";
    private static final String MESSAGE_COULD_NOT_FIND_BEER_BY_ID   = "Could not find beer by id %s";
    private static final String MESSAGE_COULD_NOT_UPDATE_BEER_RECORD = "Could not update beer record.";
    private static final String MESSAGE_COULD_NOT_DELETE_BEER_RECORD = "Beer not deleted. Check brewery or beer ID";

    private JdbcTemplate jdbcTemplate;
//    changed JdbcTemplate to DataSource
    public JdbcBeerDao(DataSource dataSource) {this.jdbcTemplate = new JdbcTemplate(dataSource);}

    @Override
    public Beer create(Beer beer) {
        try {
            Beer newBeer = new Beer(beer);
            String beerSQL = "INSERT INTO beer (beer_name,brewery_id,description,abv,beer_type_id,is_active,image_url)" +
                    "VALUES(?,?,?,?,?,?,?)" +
                    "RETURNING beer_id";
            newBeer.setBeerId(jdbcTemplate.queryForObject(beerSQL, Integer.class,
                    newBeer.getName(),
                    newBeer.getBreweryId(),
                    newBeer.getDescription(),
                    newBeer.getAbv(),
                    newBeer.getTypeId(),
                    newBeer.getIsActive(),
                    newBeer.getImageUrl()
                    ));
            return newBeer;
        } catch (DataAccessException e) {
            throw new RuntimeException(MESSAGE_COULD_NOT_CREATE_BEER_RECORD, e);
        }
    }

    @Override
    public Beer getBeerById(Integer breweryId, Integer beerId) {
        String sql = String.format(
                "SELECT beer_id, beer_name, brewery_id,description, abv, beer_type_id, is_active, image_url" +
                        " FROM beer WHERE brewery_id = ? AND beer_id = ?", breweryId, beerId);
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, breweryId, beerId);
        if (!result.next()) {
            return null;
            //removed for testing purpose.
//            throw new RecordNotFoundException(String.format(MESSAGE_COULD_NOT_FIND_BEER_BY_ID,
//                    beerId));
        }
        return mapRowToBeer(result);
    }

    @Override
    public List<Beer> getByBreweryId(int breweryId) {
        List<Beer> listBeer = new ArrayList<>();
        String sql = String.format("SELECT beer_id, beer_name, brewery_id,description, abv, beer_type_id, is_active, image_url " +
                        "FROM beer WHERE brewery_id = ?;", breweryId);
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, breweryId);
        while (result.next()){
            Beer beer = mapRowToBeer(result);
            listBeer.add(beer);
        }
        return listBeer;
    }

    @Override
    public Beer updateBeer(Beer beer, Integer breweryId, Integer beerId) {

        try {
            String beer_update_SQL =
                    "UPDATE beer SET " +
                            " beer_name = ?, brewery_id = ?, description=?, abv = ?, " +
                            "beer_type_id = ?, is_active = ?, image_url = ?" +
                    " WHERE brewery_id = ? AND beer_id = ?";
            jdbcTemplate.update(beer_update_SQL,
                    beer.getName(),
                    beer.getBreweryId(),
                    beer.getDescription(),
                    beer.getAbv(),
                    beer.getTypeId(),
                    beer.getIsActive(),
                    beer.getImageUrl(),
                    breweryId,
                    beerId
            );
            return beer;
        }catch (DataAccessException e) {
            throw new RuntimeException(MESSAGE_COULD_NOT_UPDATE_BEER_RECORD, e);
        }
    }

    @Override
    public void deleteBeer(Integer breweryId, Integer beerId) {
            String beer_delete_sql = (
                    "DELETE FROM beer WHERE brewery_id = ? AND beer_id = ?"
            );
            int numberOfRowDeleted = jdbcTemplate.update(beer_delete_sql, breweryId, beerId);
            if (numberOfRowDeleted != 1) {
                throw new RuntimeException(MESSAGE_COULD_NOT_DELETE_BEER_RECORD);
            }
        }


    private Beer mapRowToBeer(SqlRowSet rs) {
        Beer beer = new Beer();
        beer.setBeerId(rs.getInt("beer_id"));
        beer.setName(rs.getString("beer_name"));
        beer.setDescription(rs.getString("description"));
        beer.setAbv(rs.getDouble("abv"));
        beer.setBreweryId(rs.getInt("brewery_id"));
        beer.setTypeId(rs.getInt("beer_type_id"));
        beer.setActive(rs.getBoolean("is_active"));
        beer.setImageUrl(rs.getString("image_url"));
        return beer;
    }
}
