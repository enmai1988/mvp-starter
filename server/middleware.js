const session = require('express-session');
const cookie = require('cookie-parser');
const request = require('request-promise');
const qs = require('querystring');
const bodyParser = require('body-parser');
const db = require('../database-mongo/index.js');

const cookieParser = (req, res, next) => {

};

const sessionManager = (req, res, next) => {

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
    return db.Restaurant.create(restaurants);
  }).then(result => {
    res.send(JSON.stringify(result));
  });
  // request(options, (err, response, body) => {
  //   let restaurants = JSON.parse(body).businesses;
  //   db.Restaurant.create(restaurants)
  //   .then(() => {
  //     res.send(body);
  //   });
  // });
};

module.exports = {
  findItOnYelp: findItOnYelp,
  sessionManager: sessionManager,
  cookieParser: cookieParser
}
