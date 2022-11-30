package com.techelevator.dao;

import com.techelevator.dao.exception.RecordNotFoundException;
import com.techelevator.model.Address;
import com.techelevator.model.Brewery;
import com.techelevator.model.BreweryListItem;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Service
public class JdbcBreweryDao implements BreweryDao {

    private static final String MESSAGE_FORMAT_BREWERY_NOT_FOUND_EXCEPTION = "Could not find brewery with %s = %d.";
    private static final String MESSAGE_COULD_NOT_CREATE_BREWERY_RECORD = "Could not create brewery record.";
    private static final String MESSAGE_COULD_NOT_UPDATE_BREWERY_RECORD = "Could not update brewery record.";

    private JdbcTemplate jdbcTemplate;

//    changed for testing purpose
//    public JdbcBreweryDao(JdbcTemplate jdbcTemplate) {
//        this.jdbcTemplate = jdbcTemplate;
//    }
    public JdbcBreweryDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public Brewery create(Brewery brewery) {

        try {
            Brewery newBrewery = new Brewery(brewery);
            Address address = newBrewery.getAddress();
            String brewerySql =
                "INSERT INTO brewery (" +
                    "brewery_owner_user_id, " +
                    "brewery_name, " +
                    "is_active, " +
                    "is_approved, " +
                    "image_url, " +
                    "history, " +
                    "hours_of_operation, " +
                    "phone_number, " +
                    "email, " +
                    "home_page_url, " +
                    "address_street, " +
                    "address_city, " +
                    "address_state, " +
                    "address_zip_code, " +
                    "address_country" +
                ") " +
                "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) " +
                "RETURNING brewery_id;";

            newBrewery.setBreweryId(jdbcTemplate.queryForObject(brewerySql, Integer.class,
                newBrewery.getBreweryOwnerUserId(),
                newBrewery.getName(),
                newBrewery.getIsActive(),
                newBrewery.getIsApproved(),
                newBrewery.getImageUrl(),
                newBrewery.getHistory(),
                newBrewery.getHoursOfOperation(),
                newBrewery.getPhoneNumber(),
                newBrewery.getEmailAddress(),
                newBrewery.getHomePageUrl(),
                address.getStreet(),
                address.getCity(),
                address.getState(),
                address.getZipCode(),
                address.getCountry()
            ));

            return newBrewery;
        } catch (DataAccessException e) {
            throw new RuntimeException(MESSAGE_COULD_NOT_CREATE_BREWERY_RECORD, e);
        }
    }

    @Override
    public List<BreweryListItem> listAll() {
        List<BreweryListItem> listItems = new ArrayList<>();
        String sql =
            "SELECT " +
                "brewery_id, " +
                "brewery_name, " +
                "is_active, " +
                "home_page_url, " +
                "address_street, " +
                "address_city, " +
                "address_state, " +
                "address_zip_code, " +
                "address_country " +
            "FROM brewery " +
            "ORDER BY brewery_name, address_country, address_state, address_zip_code, address_city, address_street; ";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            BreweryListItem listItem = mapRowToBreweryListItem(results);
            listItems.add(listItem);
        }
        return listItems;
    }

    private BreweryListItem mapRowToBreweryListItem(SqlRowSet rs) {
        BreweryListItem listItem = new BreweryListItem();
        listItem.setId(rs.getInt("brewery_id"));
        listItem.setName(rs.getString("brewery_name"));
        listItem.setIsActive(rs.getBoolean("is_active"));
        listItem.setHomePageUrl(rs.getString("home_page_url"));
        listItem.setAddress(mapRowToAddress(rs));
        return listItem;
    }

    private Brewery getBrewery(String idFilterFieldName, int idFilterFieldValue) {
        String sql = String.format(
            "SELECT " +
                "brewery_id, " +
                "brewery_owner_user_id, " +
                "brewery_name, " +
                "is_active, " +
                "is_approved, " +
                "image_url, " +
                "history, " +
                "hours_of_operation, " +
                "phone_number, " +
                "email, " +
                "home_page_url, " +
                "address_street, " +
                "address_city, " +
                "address_state, " +
                "address_zip_code, " +
                "address_country " +
            "FROM brewery " +
            "WHERE %s = ?;", idFilterFieldName);
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, idFilterFieldValue);
        if (!results.next()) {
            throw new RecordNotFoundException(String.format(MESSAGE_FORMAT_BREWERY_NOT_FOUND_EXCEPTION,
                    idFilterFieldName, idFilterFieldValue));
        }
        return mapRowToBrewery(results);
    }

    @Override
    public Brewery getByBrewerId(int brewerUserId) {
        return getBrewery("brewery_owner_user_id", brewerUserId);
    }

    @Override
    public Brewery getByBreweryId(int breweryId) {
        return getBrewery("brewery_id", breweryId);
    }

    @Override
    public Brewery update(Brewery brewery) {

        try {
            Address address = brewery.getAddress();
            String brewerySql =
                "UPDATE brewery SET " +
                    "brewery_owner_user_id = ?, " +
                    "brewery_name = ?, " +
                    "is_active = ?, " +
                    "is_approved = ?, " +
                    "image_url = ?, " +
                    "history = ?, " +
                    "hours_of_operation = ?, " +
                    "phone_number = ?, " +
                    "email = ?, " +
                    "home_page_url = ?, " +
                    "address_street = ?, " +
                    "address_city = ?, " +
                    "address_state = ?, " +
                    "address_zip_code = ?, " +
                    "address_country = ? " +
                "WHERE brewery_id = ?;";

            if (jdbcTemplate.update(brewerySql,
                brewery.getBreweryOwnerUserId(),
                brewery.getName(),
                brewery.getIsActive(),
                brewery.getIsApproved(),
                brewery.getImageUrl(),
                brewery.getHistory(),
                brewery.getHoursOfOperation(),
                brewery.getPhoneNumber(),
                brewery.getEmailAddress(),
                brewery.getHomePageUrl(),
                address.getStreet(),
                address.getCity(),
                address.getState(),
                address.getZipCode(),
                address.getCountry(),
                brewery.getBreweryId()
            ) == 0) {
                throw new RecordNotFoundException(String.format(MESSAGE_FORMAT_BREWERY_NOT_FOUND_EXCEPTION,
                        "brewery_id", brewery.getBreweryId()));
            }

            return brewery;
        } catch (DataAccessException e) {
            throw new RuntimeException(MESSAGE_COULD_NOT_UPDATE_BREWERY_RECORD, e);
        }
    }

    private Address mapRowToAddress(SqlRowSet rs) {
        Address address = new Address();
        address.setStreet(rs.getString("address_street"));
        address.setCity(rs.getString("address_city"));
        address.setState(rs.getString("address_state"));
        address.setZipCode(rs.getString("address_zip_code"));
        address.setCountry(rs.getString("address_country"));
        return address;
    }

    private Brewery mapRowToBrewery(SqlRowSet rs) {
        Brewery brewery = new Brewery();
        brewery.setBreweryId(rs.getInt("brewery_id"));
        brewery.setBreweryOwnerUserId(rs.getInt("brewery_owner_user_id"));
        brewery.setName(rs.getString("brewery_name"));
        brewery.setIsActive(rs.getBoolean("is_active"));
        brewery.setIsApproved(rs.getBoolean("is_approved"));
        brewery.setImageUrl(rs.getString("image_url"));
        brewery.setHistory(rs.getString("history"));
        brewery.setHoursOfOperation(rs.getString("hours_of_operation"));
        brewery.setPhoneNumber(rs.getString("phone_number"));
        brewery.setEmailAddress(rs.getString("email"));
        brewery.setHomePageUrl(rs.getString("home_page_url"));
        brewery.setAddress(mapRowToAddress(rs));
        return brewery;
    }
}