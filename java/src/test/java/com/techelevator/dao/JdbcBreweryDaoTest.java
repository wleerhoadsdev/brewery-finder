package com.techelevator.dao;

import com.techelevator.model.Address;
import com.techelevator.model.Brewery;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class JdbcBreweryDaoTest extends BaseDaoTests {
    private static Address ADDRESS_1 = new Address("1-st str", "NY", "NY", "95100", "USA" );
    private static Brewery BREWERY_1 = new Brewery(1, 1, "Brewery 1", true,
            true, "since 1966" , "12:00 - 23:00",
            ADDRESS_1, "111-222-3333", "aaa@yahoo.com", "http://aaabrewery.com",
            "https://images.unsplash.com/photo-1651475828382-1ffeea47739b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8?crop=bottom&w=1620&h=1080&fit=crop&q=80");
    private static Address ADDRESS_2 = new Address("2-st str","NY","NY", "95100", "USA");
    private static Brewery BREWERY_2 = new Brewery(2,2, "BBB", true,
            true, "Opened in 2020", "12:00 - 23:00",
            ADDRESS_2, "222-222-2222", "bbb@yahoo.com", "http://bbbbrewery.com",
            "https://drive.google.com/file/d/1W5f-RFh3zAb1LBW1jrDZLDA5USpB7rLx/view?usp=share_link");

    private JdbcBreweryDao sut;

    @Before
    public void setup(){sut = new JdbcBreweryDao(dataSource);}

    @Test
    public void getByBreweryId_returns_correct_info(){
        int createdBrewery = sut.create(BREWERY_2).getBreweryId();
        Brewery brewery2 = sut.getByBreweryId(createdBrewery);
        assertBreweryMatch(BREWERY_2, brewery2 );
    }

    @Test
    public void  create_method_creates_brewery(){
        Brewery createdBrewery = sut.create(BREWERY_2);
        assertBreweryMatch(BREWERY_2, createdBrewery);
    }

    @Test
    public void  update_method_updates_brewery(){
        Brewery createdBrewery = sut.create(BREWERY_1);
        createdBrewery.setHistory("updated history");
        sut.update(createdBrewery);
        Brewery retrieveUpdatedBrewery = sut.getByBreweryId(createdBrewery.getBreweryId());
        Assert.assertEquals("updated history", retrieveUpdatedBrewery.getHistory());
    }

    @Test
    public void listAll_returned_correct_number_of_breweries(){
        int numberOfBreweries = sut.listAll().size();
        Assert.assertEquals(2, numberOfBreweries);
    }

    @Test
    public void getByBrewerId_returns_correct_info(){
        int createdBrewery = sut.create(BREWERY_2).getBreweryId();
        Brewery brewery2 = sut.getByBreweryId(createdBrewery);
        Assert.assertEquals(BREWERY_2.getBreweryOwnerUserId(), brewery2.getBreweryOwnerUserId());
    }

    private void assertBreweryMatch(Brewery expected, Brewery actual){
        Assert.assertEquals(expected.getBreweryOwnerUserId(), actual.getBreweryOwnerUserId());
        Assert.assertEquals(expected.getName(), actual.getName());
        Assert.assertEquals(expected.getIsActive(), actual.getIsActive());
        Assert.assertEquals(expected.getIsApproved(), actual.getIsApproved());
        Assert.assertEquals(expected.getHistory(), actual.getHistory());
        Assert.assertEquals(expected.getHoursOfOperation(), actual.getHoursOfOperation());
        Assert.assertEquals(expected.getAddress().getStreet(), actual.getAddress().getStreet());
        Assert.assertEquals(expected.getAddress().getCity(), actual.getAddress().getCity());
        Assert.assertEquals(expected.getAddress().getState(), actual.getAddress().getState());
        Assert.assertEquals(expected.getAddress().getZipCode(), actual.getAddress().getZipCode());
        Assert.assertEquals(expected.getAddress().getCountry(), actual.getAddress().getCountry());
        Assert.assertEquals(expected.getPhoneNumber(), actual.getPhoneNumber());
        Assert.assertEquals(expected.getEmailAddress(), actual.getEmailAddress());
        Assert.assertEquals(expected.getHomePageUrl(), actual.getHomePageUrl());
        Assert.assertEquals(expected.getImageUrl(), actual.getImageUrl());
    }
}
