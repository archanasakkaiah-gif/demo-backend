const express = require("express");
const router = express.Router();
const {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
} = require("../controllers/programController");

router.post("/", createProgram);
router.get("/", getAllPrograms);
router.get("/:id", getProgramById);
router.put("/:id", updateProgram);
router.delete("/:id", deleteProgram);

module.exports = router;
