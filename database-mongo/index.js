const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/myApp');
const Schema = mongoose.Schema;

let restaurantSchema = new Schema({
  id: { type: String, unique: true },
  name: String,
  image_url: String,
  display_phone: String,
  'location.display_address': String,
  rating: Number
});

let customerSchema = new Schema({
  restaurant_name: { type: String },
  lastname: String,
  firstname: String
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

// Restaurant.collection.drop();
// Customer.collection.drop();

module.exports = {
  Restaurant: Restaurant,
  Customer: Customer,
  Owner: Owner
};
