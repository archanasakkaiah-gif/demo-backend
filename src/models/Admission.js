const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
  {
    childName: {
      type: String,
      required: [true, "Child Name is required"],
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of Birth is required"],
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      trim: true,
    },
    parentName: {
      type: String,
      required: [true, "Parent / Guardian Name is required"],
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
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    programClass: {
      type: String,
      required: [true, "Program / Class is required"],
      trim: true,
    },
    previousSchool: {
      type: String,
      default: "",
      trim: true,
    },
    admissionDate: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
      trim: true,
    },
    admissionStatus: {
      type: String,
      enum: ["Pending", "Approved", "Enrolled", "Rejected", "Waitlisted"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admission", admissionSchema);
