const express = require('express');
const User = require('../model/users');
const registerRouter = express.Router();




 // Guest middleware
function isGuest(req, res, next) {
    if (req.session.user && req.session.user.role === 'guest') {
        next();
    } else {
        res.redirect('/login');
    }
}
registerRouter.post('/admin-register', (req, res) => {
    const user = new User({
        ...req.body,
        role: 'admin'
    });
    user.save()
        .then(() => res.redirect('/login'))
        .catch(err => res.status(500).send('An error occurred: ' + err.message));
});
registerRouter.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save()
      .then(() => {
        // If registration is successful, redirect to the intended page or to the login page
        res.redirect('/login');
      })
      .catch(err => res.status(500).send('An error occurred: ' + err.message));
  });


registerRouter.post('/operator-register', async (req, res) => { const guestData = req.body; guestData.role = 'operator'; 
const guest = new Guest(guestData); 
await guest.save(); 
const notification = new Notification({ guestId: guest._id, message: `${guest.username} has requested to register.`, status: 'pending' });
 await notification.save();
  res.send('Registration request sent'); });


registerRouter.post('/accept-registration/:notificationId', async (req, res) => {
  const notification = await Notification.findById(req.params.notificationId);
  const guest = await Guest.findById(notification.guestId);

  const existingUser = await User.findOne({ email: guest.email });
  if (existingUser) {
    res.status(400).send('A user with this email already exists');
    return;
  }

  const guestData = guest.toObject();
  const user = new User(guestData);
  await user.save();

  notification.status = 'accepted';
  await notification.save();

  res.send('Registration accepted');
});

// Reject registration route
registerRouter.post('/reject-registration/:notificationId', async (req, res) => {
  const notification = await Notification.findById(req.params.notificationId);
  notification.status = 'rejected';
  await notification.save();

  res.send('Registration rejected');
});

registerRouter.post('/guest-register', async (req, res) => { const guestData = req.body; guestData.role = 'guest'; 
const guest = new Guest(guestData); 
await guest.save(); 
const notification = new Notification({ guestId: guest._id, message: `${guest.username} has requested to register.`, status: 'pending' });
 await notification.save();
  res.send('Registration request sent'); });
registerRouter.post('/accept-registration/:notificationId', async (req, res) => {
  const notification = await Notification.findById(req.params.notificationId);
  const guest = await Guest.findById(notification.guestId);

  const existingUser = await User.findOne({ email: guest.email });
  if (existingUser) {
    res.status(400).send('A user with this email already exists');
    return;
  }

  const guestData = guest.toObject();
  const user = new User(guestData);
  await user.save();

  notification.status = 'accepted';
  await notification.save();

  res.send('Registration accepted');
});

// Reject registration route
registerRouter.post('/reject-registration/:notificationId', async (req, res) => {
  const notification = await Notification.findById(req.params.notificationId);
  notification.status = 'rejected';
  await notification.save();

  res.send('Registration rejected');
});
module.exports = registerRouter;