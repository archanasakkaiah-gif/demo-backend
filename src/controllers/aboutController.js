const About = require("../models/About");

// @desc    Add school information
// @route   POST /api/about
const addAboutInfo = async (req, res) => {
  try {
    const { schoolDescription, facilities, mission, vision, otherInfo } = req.body;

    if (!schoolDescription || !mission || !vision) {
      return res.status(400).json({ message: "School description, mission, and vision are required" });
    }

    const about = await About.create({
      schoolDescription,
      facilities: Array.isArray(facilities) ? facilities : facilities ? [facilities] : [],
      mission,
      vision,
      otherInfo: otherInfo || {},
    });

    res.status(201).json(about);
  } catch (error) {
    res.status(500).json({ message: "Failed to add school information", error: error.message });
  }
};

// @desc    Get school information
// @route   GET /api/about
const getAboutInfo = async (req, res) => {
  try {
    const about = await About.findOne().sort({ createdAt: -1 });
    if (!about) {
      return res.status(404).json({ message: "School information not found" });
    }
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch school information", error: error.message });
  }
};

// @desc    Update school information by ID
// @route   PUT /api/about/:id
const updateAboutInfo = async (req, res) => {
  try {
    const updated = await About.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "School information not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update school information", error: error.message });
  }
};

module.exports = {
  addAboutInfo,
  getAboutInfo,
  updateAboutInfo,
};
