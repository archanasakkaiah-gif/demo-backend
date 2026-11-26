const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  addGalleryImage,
  getAllGalleryImages,
  updateGalleryImage,
  deleteGalleryImage,
} = require("../controllers/galleryController");

router.post("/", upload.single("image"), addGalleryImage);
router.get("/", getAllGalleryImages);
router.put("/:id", upload.single("image"), updateGalleryImage);
router.delete("/:id", deleteGalleryImage);

module.exports = router;
