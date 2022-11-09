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
const beerType = {
  id: 1,
  name: 'Pilsner'
}

// Brewery Object sample data
const brewery = {
  id: 1,
  name: "A Brewery",

}

//Brewer User Object sample data
const brewerUser = {
  id: 1,
  username: 'BrewerDuder',
  password_hash: '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
  role: 'ROLE_BREWER',
  name: 'Dude Brewer',
  emailAddress: 'dudewhobrews22@yahoo.com'
}

// Regular User Object sample data
const regUser = {
  id: 1,
  username: 'user',
  passsword: '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
  role: 'ROLE_USER'
}

// Admin User Object sample data
const adminUser = {
  id: 1,
  username: 'admin',
  passsword: '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
  role: 'ROLE_ADMIN'
}

// Review Object sample data
const beerReview = {
  reviewId: 1,
  authorUserId: 1,
  beerId: 1,
  rating: 5,
  title: 'Dude, wheres my beer?',
  reviewBody: 'This beer is so good you will forget everything!',
  createdDate: '2022-11-06'
}