const express = require('express');
const multer = require('multer');
const uuid = require('uuid');
const Newarrival = require('../model/newarrivals');
const Order = require('../model/orders');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },  
  filename: function (req, file, cb) {
    const originalFilename = file.originalname.replace(/\..+$/, '');
    const extension = file.originalname.split('.').pop();
    cb(null, originalFilename + '-' + Date.now() + '.' + extension);
  }
});

const upload = multer({ storage: storage });

router.get('/admin-dashboard', (req, res) => res.send('Admin Dashboard'));

router.get('/user-dashboard', (req, res) => res.send('User Dashboard'));

router.get("/sales", (req, res) => res.render("sales"));




router.get('/confirmation', (req, res) => {
  res.render('confirmation');
});
router.get('/sizecharts/pumachart', (req, res) => {
  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  res.render('sizecharts/pumachart',{itemCount: itemCount,wishlistItemCount: wishlistItemCount});
});
router.get('/sizecharts/skecherchart', (req, res) => {
  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  res.render('sizecharts/skecherchart',{itemCount: itemCount,wishlistItemCount: wishlistItemCount});
});
router.get('/sizecharts/crocschart', (req, res) => {
  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  res.render('sizecharts/crocschart',{itemCount: itemCount,wishlistItemCount: wishlistItemCount});
});
router.get('/sizecharts/timberchart', (req, res) => {
  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  res.render('sizecharts/timberchart',{itemCount: itemCount,wishlistItemCount: wishlistItemCount});
});
router.get('/sizecharts/merrellchart', (req, res) => {
  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  res.render('sizecharts/merrellchart',{itemCount: itemCount,wishlistItemCount: wishlistItemCount});
});
router.get('/sizecharts/uggchart', (req, res) => {
  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  res.render('sizecharts/uggchart',{itemCount: itemCount,wishlistItemCount: wishlistItemCount});
});
router.get('/sizecharts/heydudechart', (req, res) => {
  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  res.render('sizecharts/heydudechart',{itemCount: itemCount,wishlistItemCount: wishlistItemCount});
});
router.get('/sizecharts/reefchart', (req, res) => {
  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  res.render('sizecharts/reefchart',{itemCount: itemCount,wishlistItemCount: wishlistItemCount});
});


router.get('/t&con', (req, res) => {
  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  res.render('t&con', {itemCount: itemCount, wishlistItemCount: wishlistItemCount});
});
router.get('/about', (req, res) => {
  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  res.render('about', {itemCount: itemCount, wishlistItemCount: wishlistItemCount});
});
router.get('/sizechart', (req, res) => {

  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;

  res.render('sizechart',{itemCount: itemCount,wishlistItemCount: wishlistItemCount});
});
router.get('/contact', (req, res) => {

  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;

  res.render('contact',{itemCount: itemCount,wishlistItemCount: wishlistItemCount});
});

router.get("/guest/operatorregister", (req, res) => res.render("guest/operatorregister"));

router.get("/guest/guestregister", (req, res) => res.render("guest/guestregister"));


router.get("/login", (req, res) => res.render("login"));

// Remove this line
const sharp = require('sharp');

router.post('/newarrivals', upload.any(), async (req, res) => {
  try {
    const imageFile = req.files.find(file => file.fieldname === 'image');
    const imageFiles = req.files.filter(file => file.fieldname === 'images[]');

    // Process the single image file
    const processedImage = await sharp(imageFile.path)
      .resize(1000, 1000, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .webp({ quality: 80 })
      .toFile(path.join(__dirname, '../public/uploads/', imageFile.filename + '.webp'));

    // Process the multiple image files
    const processedImages = await Promise.all(imageFiles.map(async file => {
      await sharp(file.path)
        .resize(1000, 1000, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .webp({ quality: 80 })
        .toFile(path.join(__dirname, '../public/uploads/', file.filename + '.webp'));

      return '/public/uploads/' + file.filename + '.webp';
    }));

    const newarrival = new Newarrival({
      ...req.body,
      image: '/public/uploads/' + imageFile.filename + '.webp',
      images: processedImages
    });

    await newarrival.save();
    res.redirect('/adminsystem/additem');
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred: ' + err.message);
  }
});

// Other routes...
router.get('/orderproceeding/checkout', async (req, res) => {
  const cartItems = req.session.cartItems || [];
  let total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = total > 5000 ? 0 : 500; // Replace 500 with your shipping cost
  total += shipping;
  res.render('orderproceeding/checkout', { cartItems: cartItems, total, shipping });
});

// order detail 
router.get('/adminsystem/order_detail/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId).lean();
    console.log(order.createdAt);
    if (!order) {
      res.status(404).send('Order not found');
    } else {
      // Format the createdAt date for display
      const formattedDate = new Date(order.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      res.render('adminsystem/order_detail', { order, formattedDate });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred: ' + err.message);
  }
});


// change the order status to shipping
router.get('/adminsystem/change_status/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).send('Order not found');
    } else {
      order.status = 'shipping';
      await order.save();
      res.redirect('/adminsystem/order_detail/' + orderId);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred: ' + err.message);
  }
});

let cartItems = [];

function addToCart(session, product) {
  if (!session.cartItems) {
    session.cartItems = [];
  }
  session.cartItems.push(product);
};

router.post('/add-to-cart', async (req, res) => {
  console.log(req.body); 
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const size = req.body.selectedSize; // Access the selected size
  const color = req.body.color;
  const product = await Newarrival.findById(productId);
  const productObj = product.toObject();
  productObj.quantity = quantity;
  productObj.selectedSize = size;
  productObj.selectedColor = color;
  productObj.image = product.image;
 
  addToCart(req.session, productObj);
 
  
  res.redirect('/cart');
 });

router.get('/cart', async (req, res) => {
  const newarrivals = await Newarrival.find({}); // Fetch new arrivals from the database
  const cartItems = req.session.cartItems || [];
  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  console.log('Cart Items:', cartItems); // Debug line
  let total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  console.log('Total:', total); // Debug line
  const shipping = total > 20000 ? 0 : 500; // Replace 500 with your shipping cost
  total += shipping;
  res.render('cart', { cartItems: cartItems, newarrivals: newarrivals, total, shipping,itemCount: itemCount,wishlistItemCount: wishlistItemCount });
});
router.post('/delete-from-cart', (req, res) => {
  const productId = req.body.productId;
  req.session.cartItems = req.session.cartItems.filter(item => item._id !== productId);

  // Respond with JSON
  res.json({ success: true });
});
let wishlist = [];

function addTowishList(session, product) {
  if (!session.wishlist) {
    session.wishlist = [];
  }
  session.wishlist.push(product);
};

// Example route for adding a product to the wishlist
router.post('/add-to-wishlist', async (req, res) => {
  console.log(req.body); 
  const productId = req.body.productId;
  const product = await Newarrival.findById(productId);
  const productObj = product.toObject();

  productObj.image = product.image;

  addTowishList(req.session, productObj);

  // Respond with a success status (no message)
  res.redirect('/wishlist');
});

router.get('/wishlist', async (req, res) => {
  const newarrivals = await Newarrival.find({}); // Fetch new arrivals from the database
  const wishlist = req.session.wishlist || [];
  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  console.log('wishlist Items:', wishlist); // Debug line
  let total = wishlist.reduce((sum, item) => sum + item.price, 0);
  console.log('Total:', total); // Debug line
  const shipping = total > 20000 ? 0 : 500; // Replace 500 with your shipping cost
  total += shipping;
  res.render('wishlist', { wishlist: wishlist, newarrivals: newarrivals, total, shipping,itemCount: itemCount,wishlistItemCount: wishlistItemCount });
});
router.post('/delete-from-wishlist', (req, res) => {
  const productId = req.body.productId;
  req.session.wishlist = req.session.wishlist.filter(item => item._id !== productId);
  res.redirect('/wishlist');
});
//checkout
router.get('/orderproceeding/checkout', async (req, res) => {
  const cartItems = req.session.cartItems || [];
  let total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = total > 20000 ? 0 : 500; // Replace 500 with your shipping cost
  total += shipping;
  res.render('orderproceeding/checkout', { cartItems: cartItems, total, shipping });
});
// OTP system
const otps = {};

const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
// Replace with your email provider's SMTP settings
// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'mailstoumer@gmail.com',
    pass: 'txwo vfdu yiob tkbb'
  },
  tls: {
    rejectUnauthorized: false
  }
});

router.post('/send-otp', async (req, res) => {
  const orderId = req.body.orderId;
  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404).send('Order not found');
    return;
  }

  // Generate a random OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Store the OTP for this order
  otps[orderId] = otp;

  // Send the OTP to the user's email
  transporter.sendMail({
    from: 'mailstoumer@gmail.com', // Use your email address
    to: order.email,
    subject: 'Your OTP',
    text: `Your OTP is ${otp}`
  }, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('An error occurred: ' + error.message);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('OTP sent');
    }
  });
});
// otp verification

router.post('/verify-otp', async (req, res) => {
  const orderId = req.body.orderId;
  const otp = req.body.otp;
  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404).send('Order not found');
    return;
  }

  // Check if the OTP is correct
  if (otps[orderId] !== Number(otp)) {
    res.status(400).send('Incorrect OTP');
    return;
  }

  // If the OTP is correct, confirm the order
  order.status = 'confirmed';
  await order.save();

  // Send the order details to the user's email
  let orderDetails = '';
  order.product_detail.forEach(product => {
    orderDetails += `Product ID: ${product._id}, Quantity: ${product.quantity}, Size: ${product.selectedSize}, Color: ${product.selectedColor}\n`;
  });

  transporter.sendMail({
    from: 'mailstoumer@gmail.com', // Use your email address
    to: order.email + ' mailstoumer@gmail.com', // Add the additional email address here
    subject: 'Your Order Details',
    html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>adminsystem/order-detail</title>
    
  </head>
  <body>
      
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title> Order confirmation </title>
  <meta name="robots" content="noindex,nofollow" />
  <meta name="viewport" content="width=device-width; initial-scale=1.0;" />
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
    body { margin: 0; padding: 0; background: #e1e1e1; }
    div, p, a, li, td { -webkit-text-size-adjust: none; }
    .ReadMsgBody { width: 100%; background-color: #ffffff; }
    .ExternalClass { width: 100%; background-color: #ffffff; }
    body { width: 100%; height: 100%; background-color: #e1e1e1; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    html { width: 100%; }
    p { padding: 0 !important; margin-top: 0 !important; margin-right: 0 !important; margin-bottom: 0 !important; margin-left: 0 !important; }
    .visibleMobile { display: none; }
    .hiddenMobile { display: block; }
  
    @media only screen and (max-width: 600px) {
    body { width: auto !important; }
    table[class=fullTable] { width: 96% !important; clear: both; }
    table[class=fullPadding] { width: 85% !important; clear: both; }
    table[class=col] { width: 45% !important; }
    .erase { display: none; }
    }
  
    @media only screen and (max-width: 420px) {
    table[class=fullTable] { width: 100% !important; clear: both; }
    table[class=fullPadding] { width: 85% !important; clear: both; }
    table[class=col] { width: 100% !important; clear: both; }
    table[class=col] td { text-align: left !important; }
    .erase { display: none; font-size: 0; max-height: 0; line-height: 0; padding: 0; }
    .visibleMobile { display: block !important; }
    .hiddenMobile { display: none !important; }
    }
  </style>
  
  
  <!-- Header -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tr>
      <td height="20"></td>
    </tr>
    <tr>
      <td>
        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 10px 10px 0 0;">
          <tr class="hiddenMobile">
            <td height="40"></td>
          </tr>
          <tr class="visibleMobile">
            <td height="30"></td>
          </tr>
  
          <tr>
            <td>
              <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                <tbody>
                  <tr>
                    <td>
                      <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                        <tbody>
                          <tr>
                            <td align="left"> <img src="https://drive.google.com/file/d/1c8ft6lo94ZstseVAjeUeKTWs-Sbo-hKs/view?usp=sharing" width="32" height="32" alt="logo" border="0" /></td>
                          </tr>
                          <tr class="hiddenMobile">
                            <td height="40"></td>
                          </tr>
                          <tr class="visibleMobile">
                            <td height="20"></td>
                          </tr>
                          <tr>
                            <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                            Hello, ${order.firstname}
                              <br> Thank you for shopping from our store and for your order.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                        <tbody>
                          <tr class="visibleMobile">
                            <td height="20"></td>
                          </tr>
                          <tr>
                            <td height="5"></td>
                          </tr>
                          <tr>
                            <td style="font-size: 21px; color: #ff0000; letter-spacing: -1px; font-family: 'Open Sans', sans-serif; line-height: 1; vertical-align: top; text-align: right;">
                              Invoice
                            </td>
                          </tr>
                          <tr>
                          <tr class="hiddenMobile">
                            <td height="50"></td>
                          </tr>
                          <tr class="visibleMobile">
                            <td height="20"></td>
                          </tr>
                          <tr>
                            <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: right;">
                              <small>Order ID:</small>  ${order._id}<br />
                             <small>${new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})}</small>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!-- /Header -->
  <!-- Order Details -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tbody>
      <tr>
        <td>
          <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
            <tbody>
              <tr>
              <tr class="hiddenMobile">
                <td height="60"></td>
              </tr>
              <tr class="visibleMobile">
                <td height="40"></td>
              </tr>
              <tr>
                <td>
                  <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                    <tbody>
                      <tr>
                        <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: 600; line-height: 1; vertical-align: top; " align="left">
                          Item
                        </th>
                        <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: 600; line-height: 1; vertical-align: top; " align="left">
                          <small>SKU</small>
                        </th>
                        <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: 600; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="left">
                          Quantity
                        </th>
                        <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: 600; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="center">
                          Size
                        </th>
                        <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: 600; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="center">
                          Color
                        </th>
                        <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: 600; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="right">
                          Subtotal
                        </th>
                      </tr>
                      <tr>
                        <td height="1" style="background: #bebebe;" colspan="12"></td>
                      </tr>
                      <tr>
                        <td height="10" colspan="4"></td>
                      </tr>
                      ${order.product_detail.map(product => `
                          <tr>
                            <td style="vertical-align: top; padding:10px 0;" class="article">
                              <img style="width: 30px;height: 30px;" src="${product.image.replace('/public', '')}" alt="${product.title}">
                            </td>
                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0;"><small>${product.product_code}</small></td>
                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="center">${product.quantity}</td>
                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="right">${product.selectedSize}</td>
                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="right">${product.selectedColor}</td>
                            <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="right">${product.price}</td>
                          </tr>
                          <tr>
                            <td height="1" colspan="12" style="border-bottom:1px solid #e4e4e4"></td>
                          </tr>
                        `).join('')}
                      
                     
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td height="20"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- /Order Details -->
  <!-- Total -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tbody>
      <tr>
        <td>
          <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
            <tbody>
              <tr>
                <td>
  
                  <!-- Table Total -->
                  <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                      <tbody>
                        <tr>
                          <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                            <strong>Grand Total (Incl.Shipping)</strong>
                          </td>
                          <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                            <strong>${order.Total_price}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  <!-- /Table Total -->
  
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- /Total -->
  <!-- Information -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
    <tbody>
      <tr>
        <td>
          <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
            <tbody>
              <tr>
              <tr class="hiddenMobile">
                <td height="60"></td>
              </tr>
              <tr class="visibleMobile">
                <td height="40"></td>
              </tr>
              <tr>
                <td>
                  <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                    <tbody>
                      <tr>
                        <td>
                          <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
  
                            <tbody>
                              <tr>
                                <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                  <strong>BILLING INFORMATION</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                  <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                    ${order.firstname}<br> ${order.address1}<br>  ${order.postal_code}, PAKISTAN<br> T: ${order.phone}
                                  </td>
                                </tr>
                            </tbody>
                          </table>
  
  
                          <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                            <tbody>
                              <tr class="visibleMobile">
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                  <strong>PAYMENT METHOD</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                  Credit Card<br> Credit Card Type: Visa<br> Worldpay Transaction ID: <a href="#" style="color: #ff0000; text-decoration:underline;">4185939336</a><br>
                                  <a href="#" style="color:#b0b0b0;">Right of Withdrawal</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                    <tbody>
                      <tr>
                        <td>
                          <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                            <tbody>
                              <tr class="hiddenMobile">
                                <td height="35"></td>
                              </tr>
                              <tr class="visibleMobile">
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                  <strong>SHIPPING INFORMATION</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                  <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                    Sup Inc<br> ${order.address2}<br> ${order.postal_code}, PAKISTAN<br> T: ${order.phone}
                                  </td>
                                </tr>
                            </tbody>
                          </table>
  
  
                          <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                            <tbody>
                              <tr class="hiddenMobile">
                                <td height="35"></td>
                              </tr>
                              <tr class="visibleMobile">
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 11px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 1; vertical-align: top; ">
                                  <strong>SHIPPING METHOD</strong>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="10"></td>
                              </tr>
                              <tr>
                                <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; line-height: 20px; vertical-align: top; ">
                                  TCS: PAKISTAN. Shipping Services
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr class="hiddenMobile">
                <td height="60"></td>
              </tr>
              <tr class="visibleMobile">
                <td height="30"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- /Information -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
  
    <tr>
      <td>
        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 0 0 10px 10px;">
          <tr>
            <td>
              <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                <tbody>
                  <tr>
                    <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                      Have a nice day.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr class="spacer">
            <td height="50"></td>
          </tr>
  
        </table>
      </td>
    </tr>
    <tr>
      <td height="20"></td>
    </tr>
  </table> 
  </body>
  </html>
  `
  }, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('An error occurred: ' + error.message);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Order confirmed');
    }
  });
});

// image auto resizer
router.get('/guest/golo/adminregister', (req, res) => {
  res.render('guest/golo/adminregister', { email: req.session.email });
});


const transporters = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'mailstoumer@gmail.com',
    pass: 'txwo vfdu yiob tkbb'
  }
});
router.post('/guest/golo/adminregister', async (req, res) => {
  const email = 'mailstoumer@gmail.com'; // Get the user's email from the request
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random OTP

  otps[email] = otp; // Store the OTP for this email

  transporters.sendMail({
    from: 'mailstoumer@gmail.com',
    to: email, // Send the OTP to the user's email
    subject: 'Your OTP',
    text: `Your OTP is ${otp} `
  }, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('An error occurred: ' + error.message);
    } else {
      console.log('Email sent: ' + info.response);
      res.render("guest/golo/adminregister", { message: 'OTP sent, please check your email' });
    }
  });
});

router.post('/verify-registration-otp', async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  if (otps[email] !== Number(otp)) {
    res.status(400).send('Incorrect OTP');
    return;
  }

  user.status = 'confirmed';
  await user.save();

  res.send('User registration confirmed');
});
//sales Department

router.post('/apply-discount', async (req, res) => {
  let discount = Number(req.body.discount);
  if (isNaN(discount)) {
    res.status(400).send('Invalid discount value');
    return;
  }
  const newarrivals = await Newarrival.find({ product_status: { $ne: 'sale' }});
  if (newarrivals.length === 0) {
    res.send('No items to apply sale to');
    return;
  }
  newarrivals.forEach(async (item) => {
    const old_price = item.price;
    const price = Math.round(item.price - (item.price * (discount / 100)));
    await Newarrival.updateOne({ _id: item._id }, { product_status: 'sale', old_price, discount, price });
    const updatedItem = await Newarrival.findById(item._id);
    console.log(`Updated item: `, updatedItem);
  });
  res.send('Discount applied');
});

//sales department 
router.post('/apply-season-discount', async (req, res) => {
  let discount = Number(req.body.discount);
  let season = req.body.season;
  if (isNaN(discount)) {
      res.status(400).send('Invalid discount value');
      return;
  }
  // Assuming you have a 'season' field in your Newarrival model
  const newarrivals = await Newarrival.find({ season: season, product_status: { $ne: 'sale' }});
  if (newarrivals.length === 0) {
      res.send('No items to apply sale to');
      return;
  }
  newarrivals.forEach(async (item) => {
      const old_price = item.price;
      const price = Math.round(item.price - (item.price * (discount / 100)));
      await Newarrival.updateOne({ _id: item._id }, { product_status: 'sale', old_price, discount, price });
      const updatedItem = await Newarrival.findById(item._id);
      console.log(`Updated item: `, updatedItem);
  });
  res.send('Discount applied');
});

router.post('/remove-season-discount', async (req, res) => {
  let season = req.body.season;
  // Assuming you have a 'season' field in your Newarrival model
  const newarrivals = await Newarrival.find({ season: season, product_status: 'sale' });
  if (newarrivals.length === 0) {
      res.send('No sale to remove');
      return;
  }
  newarrivals.forEach(async (item) => {
      const price = item.old_price;
      await Newarrival.updateOne({ _id: item._id }, { product_status: '', old_price: undefined, discount: undefined, price });
  });
  res.send('Sale removed');
});




//apply sales according to brand
router.post('/apply-brand-discount', async (req, res) => {
  let discount = Number(req.body.discount);
  let brand = req.body.brand;
  if (isNaN(discount)) {
      res.status(400).send('Invalid discount value');
      return;
  }
  const newarrivals = await Newarrival.find({ brand: brand, product_status: { $ne: 'sale' }});
  if (newarrivals.length === 0) {
      res.send('No items to apply sale to');
      return;
  }
  newarrivals.forEach(async (item) => {
      const old_price = item.price;
      const price = Math.round(item.price - (item.price * (discount / 100)));
      await Newarrival.updateOne({ _id: item._id }, { product_status: 'sale', old_price, discount, price });
      const updatedItem = await Newarrival.findById(item._id);
      console.log(`Updated item: `, updatedItem);
  });
  res.send('Discount applied');
});
router.post('/remove-brand-discount', async (req, res) => {
  let brand = req.body.brand;
  // Assuming you have a 'brand' field in your Newarrival model
  const newarrivals = await Newarrival.find({ brand: brand, product_status: 'sale' });
  if (newarrivals.length === 0) {
      res.send('No sale to remove');
      return;
  }
  newarrivals.forEach(async (item) => {
      const price = item.old_price;
      await Newarrival.updateOne({ _id: item._id }, { product_status: '', old_price: undefined, discount: undefined, price });
  });
  res.send('Sale removed');
});

router.post('/remove-discount', async (req, res) => {
  const newarrivals = await Newarrival.find({ product_status: 'sale' });
  if (newarrivals.length === 0) {
      res.send('No sale to remove');
      return;
  }
  newarrivals.forEach(async (item) => {
      const price = item.old_price;
      await Newarrival.updateOne({ _id: item._id }, { product_status: '', old_price: undefined, discount: undefined, price });
  });
  res.send('Discount removed');
});

// colors express code
router.get("/get-distinct-colors", async (req, res) => {
  try {
    const colors = await Newarrival.distinct('color1', { gender: 'men' });
    res.json(colors);
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred: ' + err.message);
  }
});

//alldata rendering


router.get('/alldata', async (req, res) => {
  const { gender, category, subcategory, brand, product_status, discount,season,fabrics } = req.query;
  const directoryPath = path.join(__dirname, '../public/uploads');
  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  fs.readdir(directoryPath, async function (err, files) {
    if (err) {
      console.error('Unable to scan directory: ' + err);
      return res.status(500).send('Error scanning uploads directory');
    }

    try {
      // Construct the query based on the provided filters
      const query = {};
      if (gender) query.gender = gender;
      if (category) query.category = category;
      if (subcategory) query.subcategory = subcategory;
      if (brand) query.brand = brand;
      if (fabrics) query.fabrics = fabrics;
      if (season) query.season = season;
      if (product_status) query.product_status = product_status;
      // Add a condition for the discount if it's specified
      if (discount) {
        // Assuming discount is a numeric field and you want products with a discount greater than a certain value
        query.discount = { $gte: parseFloat(discount) };
      }

      let products = await Newarrival.find(query).exec();

      // Filter products to include only those with images present in the uploads directory
      products = products.filter(product =>
        files.includes(product.image.replace('/public/uploads/', ''))
      );

      // Render the view with the filtered products
      res.render('alldata', { products, brand, category, subcategory, gender, product_status, itemCount, wishlistItemCount,fabrics,season });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching products');
    }
  });
});

router.get('/newarrivaldata', async (req, res) => {
  const { gender, category, subcategory, brand, product_status,season,fabrics } = req.query;
  const directoryPath = path.join(__dirname, '../public/uploads');
  const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  fs.readdir(directoryPath, async function (err, files) {
    if (err) {
      console.error('Unable to scan directory: ' + err);
      return res.status(500).send('Error scanning uploads directory');
    }

    try {
      // Fetch products from the database based on the gender, category, subcategory, brand, and status
      const query = {};
      if (gender) query.gender = gender;
      if (category) query.category = category;
      if (subcategory) query.subcategory = subcategory;
      if (brand) query.brand = brand;
      if (fabrics) query.fabrics = fabrics;
      if (season) query.season = season;
      if (product_status) query.product_status = product_status;

      // Use exec() to return a true Promise
      let products = await Newarrival.find(query).exec();

      // Filter products to include only those with images present in the uploads directory
      products = products.filter(product =>
        files.includes(product.image.replace('/public/uploads/', ''))
      );

      // Render the newarrivaldata.ejs view with the filtered products and the brand name
      res.render('newarrivaldata', { products, brand, category, subcategory, gender, product_status,itemCount: itemCount,wishlistItemCount: wishlistItemCount,fabrics,season   });
    } catch (err) {
      // Handle error
      console.error(err);
      res.status(500).send('Error fetching products');
    }
  });
});

// routes/newsletter.js
const Newsletter = require('../model/newsletter'); // Assuming you have a Newsletter model



router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();
    res.status(201).json({ message: 'Subscribed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while subscribing.' });
  }
});

module.exports = router;


