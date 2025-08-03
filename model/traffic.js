// model/traffic.js
const mongoose = require('mongoose');

const trafficSchema = new mongoose.Schema({
 page: String,
 count: Number,
 date: { type: Date, default: Date.now } // Add this line
}, { timestamps: true });

module.exports = mongoose.model('Traffic', trafficSchema);