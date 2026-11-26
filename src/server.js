const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const connectDB= require("./config/db");
connectDB();
const authRoutes = require("./routes/authRoutes");
const programRoutes = require("./routes/programRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const tourRoutes = require("./routes/tourRoutes");
const admissionRoutes = require("./routes/admissionRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/admissions", admissionRoutes);
app.get("/",(req, res) => {
    res.send("Node.js Server Running Successfully!");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`server running on http://localhost:${PORT}`);
});

 