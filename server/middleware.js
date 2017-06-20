const session = require('express-session');
const request = require('request-promise');
const qs = require('querystring');
const db = require('../database-mongo/index.js');

const cookieParser = (req, res, next) => {

};

const sessionManager = (req, res, next) => {
  console.log(req.cookie);
};

const findItOnYelp = (req, res, term) => {
  let query = {
    term: term,
    latitude: 37.7749,
    longitude: -122.4194,
    sort_by: 'best_match',
    categories: 'restaurants'
  };
  let options = {
    url: `https://api.yelp.com/v3/businesses/search?${qs.stringify(query)}`,
    headers: {
      Authorization: 'Bearer oV_2Jg3fInyiWVVbOGJR57VmTy4EmQBHbiBBJAn2cOQMGzvilZ7lwDEeU6iNJatbzMvcBUXvtCY9hBW6f3BpAMPZ8xx6NEGyyKCys3sjswHhMMzkWoPkkpPGWXFIWXYx'
    }
  };

  request(options).then(response => {
    let restaurants = JSON.parse(response).businesses;
    console.log(restaurants[0]);
    return db.Restaurant.create(restaurants);
  }).then(result => {
    res.send(result);
  });
};

module.exports = {
  findItOnYelp: findItOnYelp,
  sessionManager: sessionManager,
  cookieParser: cookieParser
}
