var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var path = require('path');
var middleware = require('./middleware.js');
var db = require('../database-mongo/index.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../react-client/dist'));

// handles get request
app.get('/list', (req, res) => {
  middleware.findItOnYelp(req, res);
});

// authenticate before the following will execute
// app.use(auth.sessionManager);

// require login
app.get('/owner', (req, res) => {

  // if not login, serve the login page
  // if not login, serve the signup page

});

//handles post request
app.post('/resturants', (req, res) => {
  let query = req.body.query;

});


const port = 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
