const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        studentName: {
            type: String,
            required: true,
            trim: true
        },

        age: {
            type: Number,
            required: true
        },

        gender: {
            type: String,
            enum: ["Boy", "Girl", "Other"],
            required: true
        },

        classApplyingFor: {
            type: String,
            required: true
        },

        sectionBatch: {
            type: String,
            default: ""
        },

        bloodGroup: {
            type: String,
            default: ""
        },

        parentGuardianName: {
            type: String,
            required: true
        },

        primaryMobile: {
            type: String,
            required: true
        },

        emailAddress: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        residentialAddress: {
            type: String,
            default: ""
        },

        gpsBusTransportNeeded: {
            type: String,
            enum: ["Yes", "No"],
            default: "No"
        },

        warmMealsSnackPlan: {
            type: String,
            default: "No"
        },

        initialApprovalStatus: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending"
        },

        allergies: {
            type: String,
            default: ""
        },

        specialDietary: {
            type: String,
            default: ""
        },

        educatorNotes: {
            type: String,
            default: ""
        },

        password: {
            type: String,
            required: true,
            minlength: 8
        },

        role: {
            type: String,
            enum: ["Admin", "parent"],
            default: "parent"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);