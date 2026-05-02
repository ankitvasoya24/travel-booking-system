const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingType: {
      type: String,
      enum: ["flight", "hotel", "package"],
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",  
      required: true
    },

    travelDate: {
      type: Date,
      required: true
    },

    persons: {
      type: Number,
      default: 1
    },

    amount: {
      type: Number,
      required: true
    },
    payment: {
      method: {
        type: String,
        enum: ["razorpay", "upi", "card", "cash"],
        default: "cash"
      },

      transactionId: String,

      paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "paid"
      },
      paidAt: Date
    },

    bookingStatus: {
      type: String,
      enum: [ "initiated", "pending", "confirmed", "cancelled"],
      default: "confirmed"
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
