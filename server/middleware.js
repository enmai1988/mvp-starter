const session = require('express-session');
const request = require('request');
const qs = require('querystring');
const Promise = require('bluebird');
const db = require('../database-mongo/index.js');
const util = require('./util.js');

const sessionManager = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  console.log(req.cookie);
  if (!req.cookie) {
    res.cookie('BuYongDeng', 'asdjalsdajhdhaklsdj');
    res.send();
  }

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

  request(options, (err, response, body) => {
    let restaurants = JSON.parse(body).businesses;
    db.Restaurant.create(restaurants, (err, result) => {
      if (err) { console.error(err); }
      res.send(restaurants);
    });
  });
};

module.exports = {
  findItOnYelp: findItOnYelp,
  sessionManager: sessionManager
}
