BEGIN TRANSACTION;
INSERT INTO
    users (
        username,
        password_hash,
        role,
        name,
        email_address
    )
VALUES
    (
        'user',
        '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
        'ROLE_USER',
        'user',
        'user@test.com'
    );
INSERT INTO
    users (
        username,
        password_hash,
        role,
        name,
        email_address
    )
VALUES
    (
        'admin',
        '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
        'ROLE_ADMIN',
        'admin',
        'admin@test.com'
    );
INSERT INTO
    users (
        username,
        password_hash,
        role,
        name,
        email_address
    )
VALUES
    (
        'brewer1',
        '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
        'ROLE_BREWER',
        'Brewer McBrewer',
        'brewer1@test.com'
    );
INSERT INTO
    users (
        username,
        password_hash,
        role,
        name,
        email_address
    )
VALUES
    (
        'brewer2',
        '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
        'ROLE_BREWER',
        'Brewer B. Brewerson III',
        'brewer2@test.com'
    );
INSERT INTO
    users (
        username,
        password_hash,
        role,
        name,
        email_address
    )
VALUES
    (
        'newbrewer1',
        '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
        'ROLE_BREWER',
        'Brewer B. Brewerson III',
        'brewer2@test.com'
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
        '3',
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
        '4',
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
        '5',
        'Unapproved New Brewery 3',
        'false',
        'false',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    );
INSERT INTO
    beer_type (beer_style)
VALUES
    ('Pale Lager'),
    ('Pilsner'),
    ('Dark Lager'),
    ('Brown Ale'),
    ('Pale Ale'),
    ('India Pale Ale'),
    ('Porter'),
    ('Stout'),
    ('Belgian-Style Ale'),
    ('Wheat Beer'),
    ('Wild & Sour Ale'),
    ('Specialty Beer');
INSERT INTO
    beer (
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
        'Blonde',
        '1',
        'light blonde',
        '5.9',
        '1',
        'true',
        'https://images.unsplash.com/photo-1644844616430-c0756c5b17a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8?crop=left,right&w=864&h=1080&fit=crop&q=80'
    );
INSERT INTO
    beer (
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
        'Half Dome',
        '2',
        'light hefe',
        '5.9',
        '2',
        'true',
        'https://cdn.pixabay.com/photo/2020/12/18/05/59/beer-5841254_1280.jpg'
    );
INSERT INTO
    beer_review (
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
        '4.5',
        'Good beer',
        'I drove 15 miles to have it again',
        '2022-11-06',
        '2022-11-06'
    );
INSERT INTO
    beer_review (
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
        '4.5',
        'Best beer',
        'Will buy it again',
        '2022-11-06',
        '2022-11-06'
    );
COMMIT;
