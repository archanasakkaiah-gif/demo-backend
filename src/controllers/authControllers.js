const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
    try {
        const {
            studentName,
            age,
            gender,
            classApplyingFor,
            sectionBatch,
            bloodGroup,
            parentGuardianName,
            primaryMobile,
            emailAddress,
            password,
            residentialAddress,
            gpsBusTransportNeeded,
            warmMealsSnackPlan,
            allergies,
            specialDietary,
            educatorNotes
        } = req.body;

        if (
            !studentName ||
            !age ||
            !gender ||
            !classApplyingFor ||
            !parentGuardianName ||
            !primaryMobile ||
            !emailAddress ||
            !password
        ) {
            return res.status(400).json({
                message: "All required fields are required"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            });
        }

        const email = emailAddress.toLowerCase().trim();

        const existingUser = await User.findOne({
            emailAddress: email
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            studentName,
            age,
            gender,
            classApplyingFor,
            sectionBatch,
            bloodGroup,
            parentGuardianName,
            primaryMobile,
            emailAddress: email,
            password: hashedPassword,
            residentialAddress,
            gpsBusTransportNeeded,
            warmMealsSnackPlan,
            allergies,
            specialDietary,
            educatorNotes
        });

        res.status(201).json({
            message: "Registration successful",
            user: {
                id: user._id,
                studentName: user.studentName,
                emailAddress: user.emailAddress
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};


// LOGIN
exports.login = async (req, res) => {
    try {
        const { emailAddress, password } = req.body;

        if (!emailAddress || !password) {
            return res.status(400).json({
                message: "Email and password required"
            });
        }

        const user = await User.findOne({
            emailAddress: emailAddress.toLowerCase().trim()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                studentName: user.studentName,
                emailAddress: user.emailAddress
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};