/* eslint-disable no-unused-vars */
// For Testing purposes only

//Beer Object sample data
const beerData = {
  id: 1,
  breweryId: 1,
  name: 'Stella',
  imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdrizly.com%2Fbeer%2Flager%2Fpale-lager%2Fstella-artois%2Fp4868&psig=AOvVaw3c3EIbio-DP5F9bDTdI8oQ&ust=1668051279758000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCKjaiLKVoPsCFQAAAAAdAAAAABAE',
  description: 'Stella Artois is a pilsner beer, first brewed in 1926 by Brouwerij Artois in Leuven, Belgium. In its original form, the beer is 5.2 per cent ABV, the country\'s standard for pilsners. The beer is also sold in other countries like the UK, Ireland, Canada and Australia, where it has a reduced ABV.',
  abv: 5.2,
  beerTypeId: 1,
  isActive: true
}

//Beer Type Object sample data
const beerTypeData = {
  id: 1,
  name: 'Pilsner'
}

//Beer Review Object sample data
const beerReviewData = {
  id: 1,
  author_id: 1,
  beer_id: 1,
  rating: 4.3,
  title: 'Stella Artois best beer in the world',
  review_body: 'Stella has a nice crisp flavor is more of a light lager with a hint of hops.',
  created_date: '2022-11-06',
  updated_date: '2022-11-06'
};

//Brewery Object sample data
const breweryData = {
  id: 1,
  brewery_name: 'Anheuser-Busch InBev',
  brewery_owner_user_id: 1,
  history: 'Over 800 years ago, AB InBev found its humble beginnings in the experienced brewing hands of Belgian monks. It was in their abbeys where one of our original beer brands, Leffe, came to be.',
  is_active: true,
  is_approved: true,
  phone_number: '000-000-000',
  email: 'test@email.com',
  home_page_url: 'https://www.anheuser-busch.com/',
  image_url: 'https://www.anheuser-busch.com/img/logo/2color-black-small.svg',
  hours_of_operation: '9am-5pm',
  address: {
    street: '755 Gellhorn',
    city: 'Houston',
    state: 'TX',
    zipCode: '77029',
    country: 'US'
  }
};

//User Object sample data
const userData = [{
    id: 1,
    username: 'user',
    authorities: [
      {
          "name": "ROLE_USER"
      }
    ],
    name: 'user',
    email_address: 'user@test.com'
  },
  {
    id: 2,
    username: 'brewer',
    authorities: [
      {
          "name": "ROLE_USER"
      }
    ],
    name: 'brewer',
    email_address: 'brewer@test.com',
  },
  {
    id: 3,
    username: 'admin',
    authorities: [
            {
                "name": "ROLE_ADMIN"
            }
        ],
    name: 'admin',
    email_address: 'admin@test.com',
}];

//User Object logins
const mockLogins = {
  user: {
    id: 1,
    username: 'user',
    authorities: [
      {
          "name": "ROLE_USER"
      }
    ],
    name: 'user',
    email_address: 'user@test.com'
  },
  brewer: {
    id: 2,
    username: 'brewer',
    authorities: [
      {
          "name": "ROLE_USER"
      }
    ],
    name: 'brewer',
    email_address: 'brewer@test.com',
  },
  admin: {
    id: 3,
    username: 'admin',
    authorities: [
            {
                "name": "ROLE_ADMIN"
            }
        ],
    name: 'admin',
    email_address: 'admin@test.com',
  }
};

const data = {beerData, beerTypeData, beerReviewData, breweryData, userData, mockLogins};
export default data;