const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    schoolDescription: {
      type: String,
      required: [true, "School Description is required"],
      trim: true,
    },
    facilities: {
      type: [String],
      default: [],
    },
    mission: {
      type: String,
      required: [true, "Mission is required"],
      trim: true,
    },
    vision: {
      type: String,
      required: [true, "Vision is required"],
      trim: true,
    },
    otherInfo: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
