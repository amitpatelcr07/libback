
import Student from "../models/studentModel.js";
import jwt from "jsonwebtoken";

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30m" });
};

// ✅ Student Login
export const loginStudent = async (req, res) => {
  console.log("from frontend is there is a rquest")
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await student.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(student._id);

    res.status(200).json({
      message: "Login successful",
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Student Register (optional)
export const registerStudent = async (req, res) => {
  console.log("Register request receivedqq:", req.body);
  try {
    const { name, email, password, address, fees, batchTime } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newStudent = await Student.create({
      name,
      email,
      password,
      address,
      fees,
      batchTime,
    });

    const token = generateToken(newStudent._id);

    res.status(201).json({
      message: "Registration successful",
      student: {
        _id: newStudent._id,
        name: newStudent.name,
        email: newStudent.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
