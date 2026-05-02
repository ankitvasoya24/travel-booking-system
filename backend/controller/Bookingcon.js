const Booking = require("../model/Booking");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { bookingType, itemId, travelDate, persons=1, amount } = req.body;

    if (!bookingType || !itemId || !travelDate) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (amount === undefined || amount === null || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const booking = await Booking.create({
      bookingType,
      itemId,
      userId: req.user.id,
      userInfo: {
        name: req.user.name,
        email: req.user.email,
        mobile: req.user.mobile,
      },
      travelDate,
      persons,
      amount,
       bookingStatus: "confirmed",
      payment: {
        paymentStatus: "paid",
        paidAt: new Date()
      }
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET USER BOOKINGS
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADMIN: GET ALL BOOKINGS WITH PAGINATION
exports.getAllBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const total = await Booking.countDocuments();

    const bookings = await Booking.find()
      .populate("userId", "name email mobile")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      bookings,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update by only admin
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.bookingStatus = status;
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking status updated",
      booking
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};