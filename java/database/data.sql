BEGIN TRANSACTION;

DROP TABLE IF EXISTS brewery, beer, beer_type, beer_review, brewery_address, beer_avg_rating;

CREATE TABLE brewery(
    brewery_id serial NOT NULL PRIMARY KEY,
    brewery_owner_user_id int,
    brewery_name varchar(50),
    is_active boolean,
    is_approved boolean,
    image_url varchar(200),
    history varchar(50),
    hours_of_operation varchar(50),
    phone_number varchar(50),
    email varchar(50),
    home_page_url varchar(50)
);

CREATE TABLE brewery_address (
    address_id serial NOT NULL,
    brewery_id int,
    street  varchar(50),
    city varchar(50),
    state varchar(50),
    zip_code varchar(50),
    country varchar(50),
    CONSTRAINT FK_brewery_id FOREIGN KEY (brewery_id) REFERENCES  brewery (brewery_id)
);
--select * from brewery_address as ba
--join brewery as br on br.brewery_id = ba.brewery_id
--where br.brewery_name = 'AAA'

CREATE TABLE beer(
    beer_id serial NOT NULL PRIMARY KEY,
    beer_name varchar(50) NOT NULL,
    brewery_id int,
    description varchar(50),
    abv DECIMAL(5,2),
    beer_type varchar(50),
    is_active BOOLEAN,
    image_url varchar(200),
    CONSTRAINT FK_beer_id FOREIGN KEY (brewery_id) REFERENCES  brewery (brewery_id)
);
-- select * from beer as b
-- join brewery as br on b.brewery_id = br.brewery_id
-- where br.brewery_name = 'AAA'

CREATE TABLE beer_review(
    review_id serial NOT NULL PRIMARY KEY,
    beer_id INT,
    author_user_id INT,
    rating DECIMAL(5,2),
    title varchar(50),
    review_body varchar(50),
    created_date DATE,
    CONSTRAINT FK_beer_id FOREIGN KEY (beer_id) REFERENCES beer (beer_id)
);
-- select * from beer_review as br
-- join beer as b on br.beer_id = b.beer_id
-- where b.beer_name = 'Blonde'

CREATE TABLE beer_avg_rating(
    beer_id INT,
    avg_rating DECIMAL(5,2),
    CONSTRAINT FK_beer_id FOREIGN KEY (beer_id) REFERENCES beer (beer_id)
);
--select * from beer_avg_rating as bar
--join beer as b on b.beer_id = bar.beer_id
--where b.beer_name = 'Blonde'

--CREATE TABLE images(
--    image_id serial PRIMARY KEY,
--    beer_id INT,
--    brewery_id INT,
--    image_type varchar(50),
--    image_url varchar(200),
--    CONSTRAINT FK_brewery_image_id FOREIGN KEY (brewery_id) REFERENCES  brewery (brewery_id),
--    CONSTRAINT FK_image_id FOREIGN KEY (beer_id) REFERENCES beer (beer_id)
--);

INSERT INTO brewery (brewery_owner_user_id,brewery_name, is_active, is_approved,
    history,hours_of_operation, phone_number, email, home_page_url, image_url)
VALUES ('1', 'AAA', 'true', 'true', 'since 1966', '12:00 - 23:00', '111-222-3333', 'aaa@yahoo.com',
    'http://aaabrewery.com','https://drive.google.com/file/d/1EUDDG5TW9yu0TQeLGGv4qkvc0DnQ2j6R/view?usp=share_link' );

INSERT INTO brewery_address (brewery_id, street, city, state,zip_code, country)
VALUES ('1', '1-st str', 'NY', 'NY', '95100', 'USA' );

INSERT INTO beer (
    beer_name, brewery_id, description, abv, beer_type, is_active, image_url)
    VALUES ('Blonde', '1', 'light blonde', '5.9', 'Ale', 'true', 'https://drive.google.com/file/d/1nnOH9XzctFm5N9eYJOgvfflH1wbDr4fc/view?usp=share_link');

INSERT INTO beer_review (review_id, beer_id, author_user_id, rating, title, review_body, created_date)
VALUES ('1', '1', '1', '4.5', 'Good beer', 'I drove 15 miles to have it again', '2022-11-06' );

ALTER TABLE brewery_address ADD CONSTRAINT FK_brewery_address FOREIGN KEY (brewery_id)
REFERENCES brewery (brewery_id)
ON DELETE SET NULL;

INSERT INTO beer_avg_rating (beer_id, avg_rating) VALUES ('1', '5.4');

 INSERT INTO brewery (brewery_owner_user_id,brewery_name, is_active, is_approved,
     history,hours_of_operation, phone_number, email, home_page_url, image_url)
 VALUES ('2', 'BBB', 'true', 'true', 'Opened in 2020', '12:00 - 23:00','222-222-2222', 'bbb@yahoo.com',
     'http://bbbbrewery.com', 'https://drive.google.com/file/d/1W5f-RFh3zAb1LBW1jrDZLDA5USpB7rLx/view?usp=share_link');

 INSERT INTO brewery_address (brewery_id, street, city, state,zip_code, country)
 VALUES ('2', '2-st str', 'NY', 'NY', '95100', 'USA' );

 INSERT INTO beer (
     beer_name, brewery_id, description, abv, beer_type, is_active,image_url )
     VALUES ('Half Dome', '2', 'light hefe', '5.9', 'Hefeweizen', 'true', 'https://drive.google.com/file/d/1yFhcTFzeMlXmOaiyemROi04HcrhZ0rEw/view?usp=share_link');

INSERT INTO beer_review (review_id, beer_id, author_user_id, rating, title, review_body, created_date)
VALUES ('2', '2', '2', '4.5', 'Best beer', 'Will buy it again', '2022-11-06' );

--INSERT INTO images (beer_id, brewery_id, image_type, image_url )
--VALUES ('1', '1', 'brewery', 'https://drive.google.com/file/d/1EUDDG5TW9yu0TQeLGGv4qkvc0DnQ2j6R/view?usp=share_link');
--
--INSERT INTO images (beer_id, brewery_id, image_type, image_url )
--VALUES ('1', '1', 'beer', 'https://drive.google.com/file/d/1nnOH9XzctFm5N9eYJOgvfflH1wbDr4fc/view?usp=share_link');
--
--INSERT INTO images (beer_id, brewery_id, image_type, image_url )
--VALUES ('1', '2', 'brewery', 'https://drive.google.com/file/d/1W5f-RFh3zAb1LBW1jrDZLDA5USpB7rLx/view?usp=share_link');
--
--INSERT INTO images (beer_id, brewery_id, image_type, image_url )
--VALUES ('1', '2', 'beer', 'https://drive.google.com/file/d/1yFhcTFzeMlXmOaiyemROi04HcrhZ0rEw/view?usp=share_link');

COMMIT;

