const express = require("express");
const router = express.Router();
const {
  createAdmission,
  getAllAdmissions,
  getAdmissionById,
  updateAdmission,
  updateAdmissionStatus,
  deleteAdmission,
} = require("../controllers/admissionController");

router.post("/", createAdmission);
router.get("/", getAllAdmissions);
router.get("/:id", getAdmissionById);
router.put("/:id", updateAdmission);
router.patch("/:id/status", updateAdmissionStatus);
router.delete("/:id", deleteAdmission);

module.exports = router;
