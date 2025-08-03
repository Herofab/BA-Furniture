const express = require('express');
const Newarrival = require('../model/newarrivals');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const shortid = require('shortid');
const Order = require('../model/orders');



const checkoutRouter = express.Router();

checkoutRouter.post('/checkout', async (req, res) => {
    // Check if user is logged in
    if (!req.session.user) {
        // If user is not logged in, store the intended page and redirect to signup page
        req.session.intendedUrl = '/orderproceeding/checkout';
        res.redirect('/login');
        return;
      }
  
    let products = req.body.products;
    if (!Array.isArray(products)) {
      products = [];
    }
    const productDetails = [];
    for (const productData of products) {
      const product = await Newarrival.findById(productData.id);
      const productObj = product.toObject();
      productObj.selectedSize = productData.size;
      productObj.selectedColor = productData.color;
      productObj.quantity = productData.quantity;
      productObj.image = product.image;
      productDetails.push(productObj);
    }
    //const timestamp = Date.now().toString(); 
    const orderId = shortid.generate().substring(0, 6); // Take last 6 digits
    let total = productDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = total > 5000 ? 0 : 500; // Replace 500 with your shipping cost
    total += shipping;
    const order = new Order({
        _id: orderId,
      product_detail: productDetails,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      pin: req.body.pin,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      email: req.body.email,
      phone: req.body.phone,
      phone2: req.body.phone2,
      postal_code:req.body.postal_code,
      Total_price: total,
      // Add other order properties here
    });
    await order.save();
    res.render('confirmation', { orderId: order._id }); 
  });
  module.exports = checkoutRouter;