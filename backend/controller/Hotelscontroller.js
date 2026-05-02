const Hotel = require("../model/hotel");

// CREATE HOTEL
exports.createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      data: hotel
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// GET ALL HOTELS 
exports.getAllHotels = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Hotel.countDocuments();

    const hotels = await Hotel.find()
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: hotels
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//  GET SINGLE HOTEL
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE HOTEL
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Hotel updated",
      data: hotel
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE HOTEL
exports.deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Hotel deleted"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
