package com.techelevator.dao;

import com.techelevator.model.BeerType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JdbcBeerTypeDao implements BeerTypeDao {

    private JdbcTemplate jdbcTemplate;

    public JdbcBeerTypeDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<BeerType> listAll() {
        List<BeerType> beerTypes = new ArrayList<>();
        String sql = "SELECT beer_type_id, beer_style FROM beer_type ORDER BY beer_style;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            BeerType beerType = mapRowToBeerType(results);
            beerTypes.add(beerType);
        }
        return beerTypes;
    }

    private BeerType mapRowToBeerType(SqlRowSet rs) {
        BeerType beerType = new BeerType();
        beerType.setTypeId(rs.getInt("beer_type_id"));
        beerType.setStyle(rs.getString("beer_style"));
        return beerType;
    }
}