const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/myApp');
const Schema = mongoose.Schema;

let restaurantSchema = new Schema({
  id: { type: String, unique: true },
  name: String,
  image_url: String,
  location: String,
  display_phone: String,
  rating: Number
});

let customerSchema = new Schema({
  id: { type: Number, unique: true },
  lastname: String,
  firstname: String,
  phone: String
});

let ownerSchema = new Schema({
  id: { type: Number, unique: true },
  username: String,
  password: String,
  salt: String
});

let Restaurant = mongoose.model('Restaurant', restaurantSchema);

let Customer =  mongoose.model('Customer', customerSchema);

let Owner = mongoose.model('Owner', ownerSchema);

module.exports = {
  Restaurant: Restaurant,
  Customer: Customer,
  Owner: Owner
};
