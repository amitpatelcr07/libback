import Student from "../models/studentModel.js";
// Create Student
const PROTECTED_STUDENT_ID = "697da75b11b5fd7b48e6ffae";
const addStudents = async (req, res) => {
  try {
    console.log("✅ Working fine for add student");
    console.log("Body:", req);
    console.log("File:", req.file);

    // Extract fields
    const { name, email, password, address, fees, status, batchTime } =
      req.body;
    const imageUrl = req.file ? req.file.path : undefined;

    // Validation
    if (!name || !email || !password || !address || !fees || !batchTime) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create new student
    const newStudent = new Student({
      name,
      email,
      password,
      address,
      fees,
      status,
      batchTime,
      imageUrl,
    });

    await newStudent.save();

    return res
      .status(201)
      .json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    console.log("❌ Error in addStudents:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single student
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Update request for student ID:", id);
    if (id === PROTECTED_STUDENT_ID) {
      console.log("Attempting to update protected student with ID:", id);
      return res.status(403).json({
        message: "You can’t update this student because it is protected",
      });
    }
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete student



const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    
    if (id === PROTECTED_STUDENT_ID) {
      console.log("Attempting to delete protected student with ID:", id);
      return res.status(403).json({
        message: "You can’t delete this student because it is protected",
      });
    }

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const studentController = {
  addStudents,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
export default studentController;
