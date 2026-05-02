const Booking = require("../model/Bookdestination");

exports.createBooking = async (req, res) => {
  try {
   const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      message: "Booking successful",
      data: booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllDestinationBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const totalRecords = await Booking.countDocuments();

    const bookings = await Booking.find()
      .populate("destinationId")  
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: bookings,
      totalRecords,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};