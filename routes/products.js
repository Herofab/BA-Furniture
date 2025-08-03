const express = require('express');
const Newarrival = require('../model/newarrivals');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const productRouter = express.Router();

productRouter.use(express.static('public'));


productRouter.use((req, res, next) => {
  // Ensure cartItems is an array
  req.session.cartItems = req.session.cartItems || [];
  
  // Make itemCount available in all views
  res.locals.itemCount = req.session.cartItems.length;
  
  next();
});

productRouter.use(async (req, res, next) => {
  // Example: Calculate wishlistItemCount based on session data or however you're tracking wishlist items
  // This is a placeholder logic. Replace it with your actual logic to count wishlist items.
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;

  // Make wishlistItemCount available to all views
  res.locals.wishlistItemCount = wishlistItemCount;

  next();
});

productRouter.get("/product_display", async (req, res) => {
  try {
    const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
    const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  const newarrivals = await Newarrival.find({});
  res.render("product_display", { product: product, newarrivals: newarrivals, user: req.session.user,itemCount: itemCount, wishlistItemCount: wishlistItemCount });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
});

//calling the data of product to product_detail page 
productRouter.get('/product/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Product ID is not valid.');
    }

    // Correctly construct the path to the uploads directory
const directoryPath = path.resolve(__dirname, '..', 'public', 'uploads');

    // Attempt to read the directory
    let files;
    try {
      files = await fs.promises.readdir(directoryPath);
    } catch (err) {
      console.error('Unable to scan directory: ' + err);
      return res.status(500).send('Error scanning uploads directory');
    }

    const product = await Newarrival.findById(id);

    // Check if the product exists
    if (!product) {
      return res.status(404).send('Product not found');
    }

    // Ensure the product's image is present in the uploads directory
    const imageName = product.image.replace('/public/uploads/', '');
    if (!product.image || !files.includes(imageName)) {
      return res.status(404).send('Product image not found in uploads directory');
    }

    // Fetch products from the same category and subcategory as the currently selected product
    // Assuming 'category' and 'subcategory' are fields in your product model
    const relatedProducts = await Newarrival.find({
      category: product.category,
      subcategory: product.subcategory,
      image: { $in: files.map(file => '/public/uploads/' + file) } // Ensure images are present in the uploads directory
    });

    // Pass the selected product and related products to the view
    res.render('product_display', { product: product, products: relatedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = productRouter;