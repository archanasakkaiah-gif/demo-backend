const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    programName: {
      type: String,
      required: [true, "Program Name is required"],
      trim: true,
    },
    ageGroup: {
      type: String,
      required: [true, "Age Group is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    fees: {
      type: String,
      required: [true, "Fees is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", programSchema);
