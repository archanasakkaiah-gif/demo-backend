const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    parentName: {
      type: String,
      required: [true, "Parent Name is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    preferredDate: {
      type: String,
      required: [true, "Preferred Date is required"],
      trim: true,
    },
    preferredTime: {
      type: String,
      required: [true, "Preferred Time is required"],
      trim: true,
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },
    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
