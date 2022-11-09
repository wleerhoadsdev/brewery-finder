BEGIN TRANSACTION;

DROP TABLE IF EXISTS users, brewery, beer, beer_review, brewery_address, beer_avg_rating;

DROP SEQUENCE IF EXISTS seq_user_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;


CREATE TABLE users (
	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	username varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	name varchar(50) NOT NULL,
	email_address varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

CREATE TABLE brewery (
    brewery_id serial NOT NULL,
    brewery_name varchar(50) NOT NULL,
    brewery_owner_user_id int NOT NULL,
    history varchar,
    is_active boolean NOT NULL,
    is_approved boolean NOT NULL,
    phone_number varchar(50),
    email varchar(50),
    home_page_url varchar(50),
    image_url varchar(200),
    hours_of_operation varchar(50),
    CONSTRAINT PK_brewery_id PRIMARY KEY (brewery_id),
    CONSTRAINT FK_brewery_owner_user_id FOREIGN KEY (brewery_owner_user_id) REFERENCES users (user_id)
);

CREATE TABLE brewery_address (
    address_id serial NOT NULL,
    brewery_id int NOT NULL,
    street varchar(50) NOT NULL,
    city varchar(50) NOT NULL,
    state varchar(15) NOT NULL,
    zip_code varchar(15) NOT NULL,
    country varchar(20) NOT NULL,
    CONSTRAINT PK_address_id PRIMARY KEY (address_id),
    CONSTRAINT FK_brewery_id FOREIGN KEY (brewery_id) REFERENCES  brewery (brewery_id)
);

CREATE TABLE beer(
    beer_id serial NOT NULL PRIMARY KEY,
    beer_name varchar(50) NOT NULL,
    brewery_id int NOT NULL,
    description varchar(200) NOT NULL,
    abv DECIMAL(5,2) NOT NULL,
    beer_type varchar(20) NOT NULL,
    is_active BOOLEAN NOT NULL,
    image_url varchar(200) NOT NULL,
    CONSTRAINT FK_beer_id FOREIGN KEY (brewery_id) REFERENCES  brewery (brewery_id)
);

CREATE TABLE beer_review(
    review_id serial NOT NULL PRIMARY KEY,
    beer_id INT NOT NULL,
    author_user_id INT NOT NULL,
    rating DECIMAL(5,2) NOT NULL,
    title varchar(50) NOT NULL,
    review_body varchar(200) NOT NULL,
    created_date DATE NOT NULL,
    CONSTRAINT FK_beer_id FOREIGN KEY (beer_id) REFERENCES beer (beer_id)
);

CREATE TABLE beer_avg_rating(
    beer_id INT NOT NULL,
    avg_rating DECIMAL(5,2) NOT NULL,
    CONSTRAINT FK_beer_id FOREIGN KEY (beer_id) REFERENCES beer (beer_id)
);

COMMIT TRANSACTION;