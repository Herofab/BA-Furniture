// Import required modules
const mongoose = require('mongoose');
const multer = require('multer');
const Newarrival = require('./model/newarrivals');
const routes = require('./routes/routes');
const adminRoutes = require('./routes/adminroutes');
const productRoutes = require('./routes/products');
const checkoutRoutes = require('./routes/checkout');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const User = require('./model/users');
const Banner = require('./model/banners');
const path = require('path');
const fs = require('fs');
const Order = require('./model/orders');
const shortid = require('shortid');
const session = require('express-session');
const { Guest, Notification } = require('./model/guests');
const i18n = require('i18n');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');
const passport = require('passport');
const Traffic = require('./model/traffic');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware for cookies and static files
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set view engine and views folder
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
const DB = 'mongodb+srv://mailstoumer:muhammadfaheem@cluster0.eqwu5mw.mongodb.net/faheemfurniture';
mongoose.connect(DB)
    .then(() => console.log('database connected'))
    .catch((err) => console.log('error connecting database'));

// Session setup
app.use(session({
  secret: 'umeramin1821644',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.set('views', path.join(__dirname, 'views'));
app.use('/', routes);
app.use('/', adminRoutes);
app.use('/', loginRoutes);
app.use('/', registerRoutes);
app.use('/', productRoutes);
app.use('/', checkoutRoutes);
app.use(express.static('public'));

// Session-based cart and wishlist tracking
app.use((req, res, next) => {
  req.session.cartItems = req.session.cartItems || [];
  res.locals.itemCount = req.session.cartItems.length;
  next();
});

app.use((req, res, next) => {
  const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;
  res.locals.wishlistItemCount = wishlistItemCount;
  next();
});
// Admin registration route
app.post('/admin-register', (req, res) => {
  const user = new User({
      ...req.body,
      role: 'admin'
  });
  user.save()
      .then(() => res.redirect('/login'))
      .catch(err => res.status(500).send('An error occurred: ' + err.message));
});
// Disable caching
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// Facebook authentication routes
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => res.redirect('/'));

// Middleware for roles
function isAdmin(req, res, next) {
  if (req.session.user && ['admin', 'operator', 'guest'].includes(req.session.user.role)) next();
  else res.redirect('/login');
}

function isGuest(req, res, next) {
  if (req.session.user && req.session.user.role === 'guest') next();
  else res.redirect('/login');
}

// Use view-level traffic tracking
app.use(async (req, res, next) => {
  const page = req.path;
  if (!page.includes('/uploads/')) {
    const date = new Date();
    let traffic = await Traffic.findOne({ page, date: { $gte: date.setHours(0, 0, 0, 0) } });
    if (!traffic) traffic = new Traffic({ page, count: 1, date });
    else traffic.count += 1;
    await traffic.save();
  }
  next();
});
app.get("/", async function (req, res) {
  try {
    const itemCount = req.session.cartItems ? req.session.cartItems.length : 0;
    const wishlistItemCount = req.session.wishlist ? req.session.wishlist.length : 0;

    const products = await Newarrival.find({}); // ✅ Use this as main product list

    res.render("index", {
      products: products,              // Used by slider
      newarrivals: products,           // Optional: same as above
      user: req.session.user,
      itemCount: itemCount,
      wishlistItemCount: wishlistItemCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});




// ========== Define all routes directly in this file ==========




// Import and define routes in the same file (you already did)

// Start the server
app.listen(5000, () => console.log("Server is started at port 5000"));
