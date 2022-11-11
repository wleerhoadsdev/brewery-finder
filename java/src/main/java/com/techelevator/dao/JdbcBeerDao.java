package com.techelevator.dao;

import com.techelevator.dao.exception.RecordNotFoundException;
import com.techelevator.model.Beer;
import com.techelevator.model.Brewery;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JdbcBeerDao implements BeerDao {
    private static final String MESSAGE_COULD_NOT_CREATE_BEER_RECORD = "Could not create beer record.";

    private JdbcTemplate jdbcTemplate;
    public JdbcBeerDao(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}

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
                    newBeer.getAdv(),
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
    public List<Beer> getById(int beerId) {

        // TODO: implement method
        return null;
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
    public Beer update(Beer beer) {

        // TODO: implement method
        return null;
    }

    @Override
    public void delete(int beerId) {

        // TODO: implement method
    }

    private Beer mapRowToBeer(SqlRowSet rs) {
        Beer beer = new Beer();
        beer.setBeerId(rs.getInt("beer_id"));
        beer.setName(rs.getString("beer_name"));
        beer.setDescription(rs.getString("description"));
        beer.setAdv(rs.getDouble("abv"));
        beer.setTypeId(rs.getInt("beer_type_id"));
        beer.setActive(rs.getBoolean("is_active"));
        beer.setImageUrl(rs.getString("image_url"));
        return beer;
    }
}