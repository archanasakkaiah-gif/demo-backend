const express = require("express");
const router = express.Router();
const {
  createTour,
  getAllTours,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");

router.post("/", createTour);
router.get("/", getAllTours);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);

module.exports = router;
