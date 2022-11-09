BEGIN TRANSACTION;
INSERT INTO
    users (username, password_hash, role, name, email_address)
VALUES
    (
        'user',
        '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
        'ROLE_USER',
        'user',
        'user@test.com'
    );
INSERT INTO
    users (username, password_hash, role, name, email_address)
VALUES
    (
        'admin',
        '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
        'ROLE_ADMIN',
        'admin',
        'admin@test.com'
    );
INSERT INTO
    users (username, password_hash, role, name, email_address)
VALUES
    (
        'brewer',
        '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
        'ROLE_BREWER',
        'brewer',
        'brewer@test.com'
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
        image_url
    )
VALUES
    (
        '1',
        'AAA',
        'true',
        'true',
        'since 1966',
        '12:00 - 23:00',
        '111-222-3333',
        'aaa@yahoo.com',
        'http://aaabrewery.com',
        'https://drive.google.com/file/d/1EUDDG5TW9yu0TQeLGGv4qkvc0DnQ2j6R/view?usp=share_link'
    );
INSERT INTO
    brewery_address (
        brewery_id,
        street,
        city,
        state,
        zip_code,
        country
    )
VALUES
    ('1', '1-st str', 'NY', 'NY', '95100', 'USA');
INSERT INTO
    beer (
        beer_name,
        brewery_id,
        description,
        abv,
        beer_type,
        is_active,
        image_url
    )
VALUES
    (
        'Blonde',
        '1',
        'light blonde',
        '5.9',
        'Ale',
        'true',
        'https://drive.google.com/file/d/1nnOH9XzctFm5N9eYJOgvfflH1wbDr4fc/view?usp=share_link'
    );
INSERT INTO
    beer_review (
        review_id,
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
        '1',
        '1',
        '1',
        '4.5',
        'Good beer',
        'I drove 15 miles to have it again',
        '2022-11-06',
        '2022-11-06'
    );
INSERT INTO
    beer_avg_rating (beer_id, avg_rating)
VALUES
    ('1', '5.4');
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
        image_url
    )
VALUES
    (
        '2',
        'BBB',
        'true',
        'true',
        'Opened in 2020',
        '12:00 - 23:00',
        '222-222-2222',
        'bbb@yahoo.com',
        'http://bbbbrewery.com',
        'https://drive.google.com/file/d/1W5f-RFh3zAb1LBW1jrDZLDA5USpB7rLx/view?usp=share_link'
    );
INSERT INTO
    brewery_address (
        brewery_id,
        street,
        city,
        state,
        zip_code,
        country
    )
VALUES
    ('2', '2-st str', 'NY', 'NY', '95100', 'USA');
INSERT INTO
    beer (
        beer_name,
        brewery_id,
        description,
        abv,
        beer_type,
        is_active,
        image_url
    )
VALUES
    (
        'Half Dome',
        '2',
        'light hefe',
        '5.9',
        'Hefeweizen',
        'true',
        'https://drive.google.com/file/d/1yFhcTFzeMlXmOaiyemROi04HcrhZ0rEw/view?usp=share_link'
    );
INSERT INTO
    beer_review (
        review_id,
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
        '2',
        '2',
        '2',
        '4.5',
        'Best beer',
        'Will buy it again',
        '2022-11-06',
        '2022-11-06'
    );COMMIT;