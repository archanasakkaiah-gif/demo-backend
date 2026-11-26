const Tour = require("../models/Tour");

// @desc    Create a new campus tour booking
// @route   POST /api/tours
const createTour = async (req, res) => {
  try {
    const { parentName, phoneNumber, email, preferredDate, preferredTime, message, bookingStatus } = req.body;

    if (!parentName || !phoneNumber || !email || !preferredDate || !preferredTime) {
      return res.status(400).json({
        message: "Parent name, phone, email, preferred date, and preferred time are required",
      });
    }

    const tour = await Tour.create({
      parentName,
      phoneNumber,
      email,
      preferredDate,
      preferredTime,
      message: message || "",
      bookingStatus: bookingStatus || "Pending",
    });

    res.status(201).json(tour);
  } catch (error) {
    res.status(500).json({ message: "Failed to create tour booking", error: error.message });
  }
};

// @desc    Get all tour bookings
// @route   GET /api/tours
const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tour bookings", error: error.message });
  }
};

// @desc    Update tour booking
// @route   PUT /api/tours/:id
const updateTour = async (req, res) => {
  try {
    const updated = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Tour booking not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update tour booking", error: error.message });
  }
};

// @desc    Delete tour booking
// @route   DELETE /api/tours/:id
const deleteTour = async (req, res) => {
  try {
    const deleted = await Tour.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Tour booking not found" });
    }
    res.status(200).json({ message: "Tour booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete tour booking", error: error.message });
  }
};

module.exports = {
  createTour,
  getAllTours,
  updateTour,
  deleteTour,
};
