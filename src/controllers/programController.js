const Program = require("../models/Program");

// @desc    Create a new program
// @route   POST /api/programs
const createProgram = async (req, res) => {
  try {
    const { programName, ageGroup, description, duration, fees, status } = req.body;

    if (!programName || !ageGroup || !description || !duration || !fees) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const program = await Program.create({
      programName,
      ageGroup,
      description,
      duration,
      fees,
      status: status || "Active",
    });

    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ message: "Failed to create program", error: error.message });
  }
};

// @desc    Get all programs
// @route   GET /api/programs
const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch programs", error: error.message });
  }
};

// @desc    Get program by ID
// @route   GET /api/programs/:id
const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch program", error: error.message });
  }
};

// @desc    Update program by ID
// @route   PUT /api/programs/:id
const updateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: "Failed to update program", error: error.message });
  }
};

// @desc    Delete program by ID
// @route   DELETE /api/programs/:id
const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete program", error: error.message });
  }
};

module.exports = {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
};
