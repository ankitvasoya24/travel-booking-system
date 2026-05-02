const Package = require("../model/package");

exports.createPackage = async (req, res) => {
  try {
    
    const newPackage = await Package.create(req.body);

    res.status(201).json({
      message: "Package created successfully",
      data: newPackage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getAllPackages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const total = await Package.countDocuments();

    const packages = await Package.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getPackageById = async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json(packageData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPackage = await Package.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPackage) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: updatedPackage,
    });

  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);

    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({
      message: "Package deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
