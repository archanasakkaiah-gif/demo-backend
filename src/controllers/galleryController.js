const Gallery = require("../models/Gallery");

// @desc    Add gallery image (supports file upload or imageUrl)
// @route   POST /api/gallery
const addGalleryImage = async (req, res) => {
  try {
    const { title, description, category, imageUrl: bodyImageUrl } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : bodyImageUrl;

    if (!imageUrl || !title || !category) {
      return res.status(400).json({ message: "Image, title, and category are required" });
    }

    const item = await Gallery.create({
      imageUrl,
      title,
      description: description || "",
      category,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to add gallery image", error: error.message });
  }
};

// @desc    Get all gallery images
// @route   GET /api/gallery
const getAllGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gallery images", error: error.message });
  }
};

// @desc    Update gallery image details
// @route   PUT /api/gallery/:id
const updateGalleryImage = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Gallery.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Gallery image not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update gallery image", error: error.message });
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
const deleteGalleryImage = async (req, res) => {
  try {
    const deleted = await Gallery.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Gallery image not found" });
    }
    res.status(200).json({ message: "Gallery image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete gallery image", error: error.message });
  }
};

module.exports = {
  addGalleryImage,
  getAllGalleryImages,
  updateGalleryImage,
  deleteGalleryImage,
};
