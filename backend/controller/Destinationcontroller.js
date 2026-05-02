const Destination = require("../model/destination");
const mongoose = require("mongoose");

// Create Destination
exports.createDestination = async (req, res) => {
  try {
    const { title, category, image, reviews, description, price, badge } = req.body;

    const newPackage = await Destination.create({
      title,
      category,
      image,
      reviews: reviews || 0,
      description: description || "",
      price,
      badge: badge || "",
    });

    res.status(201).json({ 
      success: true, 
      message: "Destination created", 
      data: newPackage });
  } catch (error) {
    
    res.status(400).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.getAllDestination = async (req, res) => {
  try {
    const all = req.query.all === "true"; 
    let destinations, total;

    if (all) {
    
      destinations = await Destination.find();
      total = destinations.length;
      res.status(200).json({
        success: true,
        totalRecords: total,
        data: destinations
      });
    } else {
      // Admin panel ke liye pagination
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const skip = (page - 1) * limit;
      total = await Destination.countDocuments();
      destinations = await Destination.find().skip(skip).limit(limit);

      res.status(200).json({
        success: true,
        totalRecords: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        data: destinations
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Update
exports.updateDestination = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid package ID" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: "No data provided for update" });
    }

    const updatedPackage = await Destination.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPackage) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }

    res.status(200).json({ success: true, message: "Package updated", data: updatedPackage });
  } catch (error) {
   
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete
exports.deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid package ID" });
    }

    const deletedPackage = await Destination.findByIdAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }

    res.status(200).json({ success: true, message: "Package deleted", data: deletedPackage });
  } catch (error) {
    console.error("DELETE PACKAGE ERROR 👉", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get Single
exports.getPackageById = async (req, res) => {
  try {
    let { id } = req.params;
    id = id.trim(); 

    const destinationItem = await Destination.findById(id);

    if (!destinationItem) {
      return res.status(404).json({ success: false, message: "Destination not found" });
    }

    res.status(200).json({ success: true, data: destinationItem });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};