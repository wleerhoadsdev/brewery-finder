BEGIN TRANSACTION;

--DROP TABLE IF EXISTS users, brewery, beer, beer_review, beer_avg_rating;

--DROP SEQUENCE IF EXISTS seq_user_id;

--CREATE SEQUENCE seq_user_id
--  INCREMENT BY 1
--  NO MAXVALUE
--  NO MINVALUE
--  CACHE 1;


--CREATE TABLE users (
--	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
--	username varchar(50) NOT NULL,
--	password_hash varchar(200) NOT NULL,
--	role varchar(50) NOT NULL,
--	name varchar(50) NOT NULL,
--	email_address varchar(50) NOT NULL,
--	CONSTRAINT PK_user PRIMARY KEY (user_id)
--);

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
	address_street varchar(50) NOT NULL,
    address_city varchar(50) NOT NULL,
    address_state varchar(15) NOT NULL,
    address_zip_code varchar(15) NOT NULL,
    address_country varchar(20) NOT NULL,
    CONSTRAINT PK_brewery_id PRIMARY KEY (brewery_id)
--    CONSTRAINT FK_brewery_owner_user_id FOREIGN KEY (brewery_owner_user_id) REFERENCES users (user_id)
);

CREATE TABLE beer_type(
    beer_type_id serial NOT NULL,
    beer_style varchar(50) NOT NULL,
    CONSTRAINT PK_beer_type_id PRIMARY KEY (beer_type_id)
);

CREATE TABLE beer(
    beer_id serial NOT NULL,
    brewery_id int NOT NULL,
    beer_name varchar(50) NOT NULL,
    image_url varchar(200) NOT NULL,
    description varchar NOT NULL,
    abv DECIMAL(5,2) NOT NULL,
    beer_type_id int NOT NULL,
    is_active BOOLEAN NOT NULL,
    CONSTRAINT PK_beer_id PRIMARY KEY (beer_id),
    CONSTRAINT FK_brewery_id FOREIGN KEY (brewery_id) REFERENCES brewery (brewery_id),
    CONSTRAINT FK_beer_type_id FOREIGN KEY (beer_type_id) REFERENCES beer_type (beer_type_id)
);

CREATE TABLE beer_review(
    review_id serial NOT NULL,
    author_id INT NOT NULL,
    beer_id INT NOT NULL,
    rating DECIMAL(5,2) NOT NULL,
    title varchar(50) NOT NULL,
    review_body varchar(200) NOT NULL,
    created_date TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_date TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT PK_review_id PRIMARY KEY (review_id),
--    CONSTRAINT FK_author_id FOREIGN KEY (author_id) REFERENCES users (user_id),
    CONSTRAINT FK_beer_id FOREIGN KEY (beer_id) REFERENCES beer (beer_id)
);

--INSERT INTO
--    users (
--        username,
--        password_hash,
--        role,
--        name,
--        email_address
--    )
--VALUES
--    (
--        'user',
--        '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
--        'ROLE_USER',
--        'user',
--        'user@test.com'
--    );
--INSERT INTO
--    users (
--        username,
--        password_hash,
--        role,
--        name,
--        email_address
--    )
--VALUES
--    (
--        'admin',
--        '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
--        'ROLE_ADMIN',
--        'admin',
--        'admin@test.com'
--    );
--INSERT INTO
--    users (
--        username,
--        password_hash,
--        role,
--        name,
--        email_address
--    )
--VALUES
--    (
--        'brewer1',
--        '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
--        'ROLE_BREWER',
--        'Brewer McBrewer',
--        'brewer1@test.com'
--    );
--INSERT INTO
--    users (
--        username,
--        password_hash,
--        role,
--        name,
--        email_address
--    )
--VALUES
--    (
--        'brewer2',
--        '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
--        'ROLE_BREWER',
--        'Brewer B. Brewerson III',
--        'brewer2@test.com'
--    );
--INSERT INTO
--    users (
--        username,
--        password_hash,
--        role,
--        name,
--        email_address
--    )
--VALUES
--    (
--        'newbrewer1',
--        '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
--        'ROLE_BREWER',
--        'Brewer B. Brewerson III',
--        'brewer2@test.com'
--    );
INSERT INTO
    brewery (
        brewery_owner_user_id,
        brewery_name,
        is_active,
        is_approved,
        history,
        hours_of_operation,
        phone_number,
        email,
        home_page_url,
        image_url,
        address_street,
        address_city,
        address_state,
        address_zip_code,
        address_country
    )
VALUES
    (
        '1',
        'Brewery 1',
        'true',
        'true',
        'since 1966',
        '12:00 - 23:00',
        '111-222-3333',
        'aaa@yahoo.com',
        'http://aaabrewery.com',
        'https://images.unsplash.com/photo-1651475828382-1ffeea47739b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8?crop=bottom&w=1620&h=1080&fit=crop&q=80',
        '1-st str',
        'NY',
        'NY',
        '95100',
        'USA'
    );
INSERT INTO
    brewery (
        brewery_owner_user_id,
        brewery_name,
        is_active,
        is_approved,
        history,
        hours_of_operation,
        phone_number,
        email,
        home_page_url,
        image_url,
        address_street,
        address_city,
        address_state,
        address_zip_code,
        address_country
    )
VALUES
    (
        '2',
        'Brewery 2',
        'true',
        'true',
        'Opened in 2020',
        '12:00 - 23:00',
        '222-222-2222',
        'bbb@yahoo.com',
        'http://bbbbrewery.com',
        'https://images.unsplash.com/photo-1623051425306-70cfe23fe75e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8?w=810&h=1080&q=80',
        '2-st str',
        'NY',
        'NY',
        '95100',
        'USA'
    );
--INSERT INTO
--    brewery (
--        brewery_owner_user_id,
--        brewery_name,
--        is_active,
--        is_approved,
--        history,
--        hours_of_operation,
--        phone_number,
--        email,
--        home_page_url,
--        image_url,
--        address_street,
--        address_city,
--        address_state,
--        address_zip_code,
--        address_country
--    )
--VALUES
--    (
--        '5',
--        'Unapproved New Brewery 3',
--        'false',
--        'false',
--        '',
--        '',
--        '',
--        '',
--        '',
--        '',
--        '',
--        '',
--        '',
--        '',
--        ''
--    );
INSERT INTO
    beer_type (beer_type_id, beer_style)
VALUES
    ('1', 'Ale'),
    ('2', 'Hefeweizen');
INSERT INTO
    beer (
--        beer_id,
        beer_name,
        brewery_id,
        description,
        abv,
        beer_type_id,
        is_active,
        image_url
    )
VALUES
    (
--    '20',
        'Blonde',
        '1',
        'light blonde',
        '5.9',
        '1',
        'true',
        'https://images_20.com'
    );
INSERT INTO
    beer (
--        beer_id,
        beer_name,
        brewery_id,
        description,
        abv,
        beer_type_id,
        is_active,
        image_url
    )
VALUES
    (
--    '30',
        'Half Dome',
        '2',
        'light hefe',
        '5.9',
        '2',
        'true',
        'https://cdn.pixabay.com/photo/2015/09/21/18/07/irish-950380_1280.jpg'
    );
----    for testing purpose
--    INSERT INTO
--    beer (
----        beer_id,
--        beer_name,
--        brewery_id,
--        description,
--        abv,
--        beer_type_id,
--        is_active,
--        image_url
--    )
--VALUES
--    (
----    '20',
--        'Blonde',
--        '1',
--        'light blonde',
--        '1.0',
--        '1',
--        'true',
--        'https://images_20.com'
--    );
INSERT INTO
    beer_review (
--        review_id,
        beer_id,
        author_id,
        rating,
        title,
        review_body,
        created_date,
        updated_date
    )
VALUES
    (
--        '1',
        '1',
        '1',
        '4.5',
        'Good beer',
        'I drove 15 miles to have it again',
        '2022-11-06',
        '2022-11-06'
    );
INSERT INTO
    beer_review (
--        review_id,
        beer_id,
        author_id,
        rating,
        title,
        review_body,
        created_date,
        updated_date
    )
VALUES
    (
--        '2',
        '2',
        '2',
        '4.5',
        'Best beer',
        'Will buy it again',
        '2022-11-06',
        '2022-11-06'
        );

COMMIT TRANSACTION;