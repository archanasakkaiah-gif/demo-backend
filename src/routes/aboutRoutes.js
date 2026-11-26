const express = require("express");
const router = express.Router();
const {
  addAboutInfo,
  getAboutInfo,
  updateAboutInfo,
} = require("../controllers/aboutController");

router.post("/", addAboutInfo);
router.get("/", getAboutInfo);
router.put("/:id", updateAboutInfo);

module.exports = router;
