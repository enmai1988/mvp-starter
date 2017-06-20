const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./middleware.js');
const cookieParser = require('cookie-parser');
const db = require('../database-mongo/index.js');
const request = require('request-promise');
const qs = require('querystring');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../react-client/dist'));

// handles get request
app.get('/list', (req, res) => {
  db.Restaurant.find().limit(25).sort('-rating').then(result => {
    res.send(result);
  });
});

app.get('/queue', (req, res) => {
  let name = qs.parse(req.url.substring(7)).name;
  db.Customer.find({restaurant_name: name}).then(queue => {
    res.send(queue);
  });
});

app.post('/queue', (req, res) => {
  db.Customer.create([req.body], (err, result) => {
    if (err) { console.error(err); }
  })
  .then(() => {
    db.Customer.find({restaurant_name: req.body.restaurant_name}).then(queue => {
      res.send(queue);
    });
  });
});

app.post('/dequeue', (req, res) => {
  console.log(req.body._id);
  db.Customer.findOneAndRemove({firstname: req.body.firstname, lastname: req.body.lastname, restaurant_name: req.body.restaurant_name})
  .then(result => {
    console.log('removed: ', result);
  })
  .then(() => {
    return db.Customer.find({restaurant_name: req.body.restaurant_name});
  })
  .then(result => {
    res.send(result);
  });
});

//handles post request
app.post('/restaurants/imports', (req, res) => {
  middleware.findItOnYelp(req, res, req.body.query);
});

app.get('/owner', (req, res) => {
  res.cookie('owner', 'true');
  res.redirect('/');
});

// authenticate before the following will execute
app.use(cookieParser());
app.use(middleware.sessionManager);

// require login
app.post('/login', (req, res) => {
  // if not login, serve the login page
  // if login, serve the index page
});



const port = 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
