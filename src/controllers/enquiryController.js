const Enquiry = require("../models/Enquiry");

// @desc    Create a new contact enquiry
// @route   POST /api/enquiries
const createEnquiry = async (req, res) => {
  try {
    const { parentName, phoneNumber, email, message, enquiryStatus } = req.body;

    if (!parentName || !phoneNumber || !email || !message) {
      return res.status(400).json({ message: "Parent name, phone, email, and message are required" });
    }

    const enquiry = await Enquiry.create({
      parentName,
      phoneNumber,
      email,
      message,
      enquiryStatus: enquiryStatus || "New",
    });

    res.status(201).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to create enquiry", error: error.message });
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enquiries", error: error.message });
  }
};

// @desc    Get enquiry by ID
// @route   GET /api/enquiries/:id
const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enquiry", error: error.message });
  }
};

// @desc    Update enquiry
// @route   PUT /api/enquiries/:id
const updateEnquiry = async (req, res) => {
  try {
    const updated = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update enquiry", error: error.message });
  }
};

// @desc    Update enquiry status
// @route   PATCH /api/enquiries/:id/status
const updateEnquiryStatus = async (req, res) => {
  try {
    const { enquiryStatus } = req.body;
    if (!enquiryStatus) {
      return res.status(400).json({ message: "enquiryStatus is required" });
    }

    const updated = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { enquiryStatus },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update enquiry status", error: error.message });
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
const deleteEnquiry = async (req, res) => {
  try {
    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete enquiry", error: error.message });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
};
