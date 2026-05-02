const Flight = require("../model/flight");

exports.createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);

    res.status(201).json({
      message: "Flight created successfully",
      data : flight
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getAllFlights = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const total = await Flight.countDocuments();

    const flights = await Flight.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      totalFlights: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: flights
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getFlightById = async (req, res) => {
  try {
    const { id } = req.params;

    const flight = await Flight.findById(id);

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      });
    }

    res.status(200).json({
      success: true,
      data: flight,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!flight) {
      return res.status(404).json({
        message: "Flight not found"
      });
    }

    res.status(200).json({
      message: "Flight updated successfully",
      flight
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);

    if (!flight) {
      return res.status(404).json({
        message: "Flight not found"
      });
    }

    res.status(200).json({
      message: "Flight deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
