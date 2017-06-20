const session = require('express-session');
const cookie = require('cookie-parser');
var qs = require('querystring');

const cookieParser = (req, res, next) => {

};

const sessionManager = (req, res, next) => {

};

const findItOnYelp = (req, res) => {
  let query = {
    term: 'restaurants',
    latitude: 37.7749,
    longitude: -122.4194,
    sort_by: 'best_match'
  };
  let options = {
    url: `https://api.yelp.com/v3/businesses/search?${qs.stringify(query)}`,
    headers: {
      Authorization: 'Bearer oV_2Jg3fInyiWVVbOGJR57VmTy4EmQBHbiBBJAn2cOQMGzvilZ7lwDEeU6iNJatbzMvcBUXvtCY9hBW6f3BpAMPZ8xx6NEGyyKCys3sjswHhMMzkWoPkkpPGWXFIWXYx'
    }
  };

  request(options, (err, response, body) => {
    res.send(body);
  });
};

module.exports = {
  findItOnYelp: findItOnYelp,
  sessionManager: sessionManager,
  cookieParser: cookieParser
}
