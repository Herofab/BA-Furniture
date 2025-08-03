const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order_detail = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
  },
  product_detail: [{
    _id: Schema.Types.ObjectId,
    product_code: String,
    title: String,
    price: Number,
    quantity: String, // Add this line
    selectedSize: String, // Add this line
    selectedColor: String, // Add this line
    image: String,
    // Add other product properties here
  }],
  firstname:{
    type: String,
  },
  lastname:{
    type: String,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
  },
  phone: {
    type: String,
  },
  phone2:{
    type: String,
  },
  postal_code: {
    type: String,
  },
  status: {
    type: String,
    default: 'pending' // Add this line
  },
  notification: {
    type: String,
  },
  Total_price: {
    type: String,
  },
},
{ 
  timestamps: true ,
}

);

module.exports = mongoose.model("Order", order_detail);