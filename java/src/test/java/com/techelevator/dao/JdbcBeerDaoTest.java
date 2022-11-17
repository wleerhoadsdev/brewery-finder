package com.techelevator.dao;

import com.techelevator.model.Beer;
import com.techelevator.model.Brewery;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class JdbcBeerDaoTest extends BaseDaoTests {

//TODO: to add beer instance to compare with entire beer object we received.
//    private static final Beer BEER_1 = new Beer(1, "Blonde", 1, "light blonde",
//        5.9,1, true,
//        "https://drive.google.com/file/d/1nnOH9XzctFm5N9eYJOgvfflH1wbDr4fc/view?usp=share_link");
//    private static final Beer BEER_TEST_1 = new Beer(BEER_1);

//    private static final Brewery BREWERY_1 = new Brewery();
    private JdbcBeerDao sut;

    @Before
    public void setup() {sut = new JdbcBeerDao(dataSource);}

//    @Ignore
    @Test
    public void getBeerById_return_correct_info(){
        Beer beer1 = sut.getBeerById(1,1);
//        TODO: instead of asserting every item, to assert beer object with beer object.
//        Assert.assertEquals("Beer didn't match", beer1, BEER_TEST_1);
        Assert.assertEquals("ID didn't match", beer1.getBeerId(), 1);
        Assert.assertEquals("Description didn't match", beer1.getDescription(), "light blonde");
    }


}
