const Admission = require("../models/Admission");

// @desc    Create a new admission
// @route   POST /api/admissions
const createAdmission = async (req, res) => {
  try {
    const {
      childName,
      dateOfBirth,
      gender,
      parentName,
      phoneNumber,
      email,
      address,
      programClass,
      previousSchool,
      admissionDate,
      admissionStatus,
    } = req.body;

    if (
      !childName ||
      !dateOfBirth ||
      !gender ||
      !parentName ||
      !phoneNumber ||
      !email ||
      !address ||
      !programClass
    ) {
      return res.status(400).json({ message: "All required admission fields must be provided" });
    }

    const admission = await Admission.create({
      childName,
      dateOfBirth,
      gender,
      parentName,
      phoneNumber,
      email,
      address,
      programClass,
      previousSchool: previousSchool || "",
      admissionDate: admissionDate || new Date().toISOString().split("T")[0],
      admissionStatus: admissionStatus || "Pending",
    });

    res.status(201).json(admission);
  } catch (error) {
    res.status(500).json({ message: "Failed to create admission", error: error.message });
  }
};

// @desc    Get all admissions (supports search, programClass filter, status filter)
// @route   GET /api/admissions
const getAllAdmissions = async (req, res) => {
  try {
    const { search, programClass, status } = req.query;
    const query = {};

    if (programClass && programClass !== "All") {
      query.programClass = programClass;
    }

    if (status && status !== "All") {
      query.admissionStatus = status;
    }

    if (search && search.trim() !== "") {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [
        { childName: regex },
        { parentName: regex },
        { phoneNumber: regex },
        { email: regex },
        { programClass: regex },
      ];
    }

    const admissions = await Admission.find(query).sort({ createdAt: -1 });
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admissions", error: error.message });
  }
};

// @desc    Get admission by ID
// @route   GET /api/admissions/:id
const getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({ message: "Admission record not found" });
    }
    res.status(200).json(admission);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admission", error: error.message });
  }
};

// @desc    Update admission
// @route   PUT /api/admissions/:id
const updateAdmission = async (req, res) => {
  try {
    const updated = await Admission.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Admission record not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update admission", error: error.message });
  }
};

// @desc    Update admission status
// @route   PATCH /api/admissions/:id/status
const updateAdmissionStatus = async (req, res) => {
  try {
    const { admissionStatus } = req.body;
    if (!admissionStatus) {
      return res.status(400).json({ message: "admissionStatus is required" });
    }

    const updated = await Admission.findByIdAndUpdate(
      req.params.id,
      { admissionStatus },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Admission record not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update admission status", error: error.message });
  }
};

// @desc    Delete admission
// @route   DELETE /api/admissions/:id
const deleteAdmission = async (req, res) => {
  try {
    const deleted = await Admission.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Admission record not found" });
    }
    res.status(200).json({ message: "Admission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete admission", error: error.message });
  }
};

module.exports = {
  createAdmission,
  getAllAdmissions,
  getAdmissionById,
  updateAdmission,
  updateAdmissionStatus,
  deleteAdmission,
};
