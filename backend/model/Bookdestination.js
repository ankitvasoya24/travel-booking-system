const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  persons: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  specialRequest: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("BookingDestination", bookingSchema);