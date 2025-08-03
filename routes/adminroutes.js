const express = require('express');
const multer = require('multer');
const User = require('../model/users');
const Order = require('../model/orders');
const Newarrival = require('../model/newarrivals');
const Traffic = require('../model/traffic');
const path = require('path');
const fs = require('fs');






// const registerRoutes = require('./routes/register');

const { Guest, Notification } = require('../model/guests');
const adminRouter = express.Router();
//=======================lets add=============================================
// Admin registration route
// Admin middleware
function isAdmin(req, res, next) {
    console.log('Session user in isAdmin:', req.session.user); // Add this line
    if (req.session.user) {
      console.log('User role:', req.session.user.role); // Add this line
      if (req.session.user.role === 'admin'|| req.session.user.role === 'operator' || req.session.user.role === 'guest' ) {
        next();
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
}

//=======================lets add=============================================

adminRouter.get('/adminsystem/dashboard', async (req, res) => {
  const notifications = await Notification.find({ status: 'pending' });
  const users = await User.find({});
  res.render('adminsystem/dashboard', { notifications, users, user: req.session.user || {} });
});

adminRouter.get('/adminsystem/webtraffic', isAdmin, async (req, res) => {
  try {
     const selectedDate = req.query.date ? new Date(req.query.date) : new Date(); // Convert string to Date object if provided
     const trafficData = await Traffic.aggregate([
       {
         $match: {
           date: {
             $gte: new Date(selectedDate.setHours(0, 0, 0, 0)), // Start of the selected date
             $lt: new Date(selectedDate.setHours(23, 59, 59, 999)) // End of the selected date
           }
         }
       },
       {
         $group: {
           _id: { page: "$page", date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } },
           count: { $sum: "$count" }
         }
       },
       {
         $sort: { "_id.date": 1 }
       }
     ]);
     const user = req.session.user || {}; // Ensure user is defined, even if not logged in
     const notifications = await Notification.find({ status: 'pending' }); // Fetch pending notifications
     res.render('adminsystem/webtraffic', { trafficData, user, notifications });
  } catch (err) {
     console.log(err);
     res.status(500).send('An error occurred: ' + err.message);
  }
 });

 // Admin route
 adminRouter.get('/admin', isAdmin, async (req, res) => {
     try {
         const newarrivals = await Newarrival.find({});
         res.render('admin', { newarrivals: newarrivals, user: req.session.user });
         
     } catch (err) {
         console.log(err);
         res.status(500).send('An error occurred: ' + err.message);
     }
 });
 
 //delete the data of users code
 adminRouter.post('/update-role/:userId', async (req, res) => {
   const userId = req.params.userId;
   const newRole = req.body.role;
   await User.updateOne({ _id: userId }, { role: newRole });
   res.send('Role updated');
 });
 //delete the data of users code
 adminRouter.post('/delete-user/:userId', async (req, res) => {
   const userId = req.params.userId;
   await User.deleteOne({ _id: userId });
   res.send('User deleted');
 });

  // Adminsystem dashboard route
   adminRouter.get("/adminsystem/newarrival",  isAdmin,  function (req, res){
       const directoryPath = path.join(__dirname, '../public/uploads');
       fs.readdir(directoryPath, function (err, files) {
           if (err) {
               return console.log('Unable to scan directory: ' + err);
           }
   
           Newarrival.find({}).then(newarrivals => {
               newarrivals = newarrivals.map(newarrival => {
                   const imageExists = newarrival.image && files.includes(newarrival.image.replace('../public/uploads/', ''));
                   const productCodeExists = !!newarrival.product_code;
                   return {
                       ...newarrival._doc,
                       imageExists,
                       productCodeExists
                   };
               });
               res.render("adminsystem/newarrival", {newarrivals: newarrivals, files: files,user: req.session.user, currentPage: 'newarrival'});
           }).catch(err => console.log(err));
       });
   });
 
   adminRouter.get('/adminsystem/newarrival/:productId', async (req, res) => {
     try {
       const productId = req.params.productId;
       // Check if the id is a valid ObjectId
       if (!mongoose.Types.ObjectId.isValid(productId)) {
         return res.status(400).send('Product ID is not valid.');
       }
   
       // Fetch the product from the database using the productId
       const product = await Newarrival.findById(productId);
   
       // Check if the product exists
       if (!product) {
         return res.status(404).send('Product not found');
       }
   
       // Prepend the base URL to the image path
       if (product.image) {
         product.image = 'http://localhost:3000' + product.image;
       }
       if (product.images && Array.isArray(product.images)) {
         product.images = product.images.map(image => 'http://localhost:3000' + image);
       }
   
       // Send the product details as JSON
       res.json(product);
     } catch (error) {
       console.error(error);
       res.status(500).send('An error occurred while fetching the product details.');
     }
   });
   // Edit data page route
   adminRouter.get("/adminsystem/editarrivaldata/:id",  isAdmin,   async (req, res) => {
       try {
           const newarrivals = await Newarrival.findById(req.params.id);
           res.render("adminsystem/editarrivaldata", { newarrivals: newarrivals });
       } catch (err) {
           console.log(err);
           res.status(500).send('An error occurred: ' + err.message);
       }
   });
   
   // Delete data from dashboard
   adminRouter.post('/delete/:id', isAdmin,  async (req, res) => {
       try {
           await Newarrival.findByIdAndDelete(req.params.id);
           res.redirect('/adminsystem/newarrival');
       } catch (err) {
           res.status(500).send('An error occurred: ' + err.message);
       }
   });
   const storage = multer.diskStorage({
       destination: function(req, file, cb) {
           cb(null, './public/uploads/');
       },
       filename: function(req, file, cb) {
           // Replace spaces with underscores in the filename
           const newFilename = file.originalname.replace(/\s/g, '_');
           cb(null, Date.now() + '-' + newFilename);
       }
   });
   const upload = multer({ storage: storage });
   adminRouter.post("/edit/:id", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 10 }]), async (req, res) => {
       try {
           let updateData = req.body;
           if (req.files.image) {
               updateData.image = '/public/uploads/' + req.files.image[0].filename;
           } else {
               delete updateData.image;
           }
           if (req.files.images) {
               updateData.images = req.files.images.map(file => '/public/uploads/' + file.filename);
           } else {
               delete updateData.images;
           }
           await Newarrival.updateOne({ _id: req.params.id }, updateData);
           res.redirect('/adminsystem/newarrival');
       } catch (err) {
           console.log(err);
           res.status(500).send('An error occurred: ' + err.message);
       }
   });
   
   adminRouter.get('/adminsystem/additem/:id?', isAdmin, async (req, res) => {
     try {
        const bannerId = req.params.id;
        let banner = null;
        if (bannerId) {
            banner = await Banner.findById(bannerId);
            if (!banner) {
                return res.status(404).send('Banner not found');
            }
        }
        res.render('adminsystem/additem', { user: req.session.user, banner: banner });
     } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the banner');
     }
    });
  
   adminRouter.get("/adminsystem/sales",isAdmin, (req, res) => res.render("adminsystem/sales" , {  user: req.session.user }));
   
// adminRouter.js
adminRouter.get('/adminsystem/order', isAdmin, async (req, res) => {
  try {
    const { start, end, status } = req.query;

    const query = {};

    // Date range filter
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999); // Include the whole end day

      query.createdAt = { $gte: startDate, $lte: endDate };
    }

    // Optional status filter
    if (status && status !== 'All') {
      query.status = status;
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    const user = req.session.user || {};

    res.render('adminsystem/order', {
      orders,
      user,
      filters: { start, end, status } // Pass back to remember in form
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred: ' + err.message);
  }
});

   
   adminRouter.get('/adminsystem/order_detail', isAdmin, async (req, res) => {
       try {
         const orders = await Order.find({});
         res.render('adminsystem/order_detail', { user: req.session.user, orders: orders });
       } catch (err) {
         console.log(err);
         res.status(500).send('An error occurred: ' + err.message);
       }
     });
 
 


module.exports = adminRouter;