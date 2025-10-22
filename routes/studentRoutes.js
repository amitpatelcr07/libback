import express from "express";
import parser from "../config/multerStorage.js";
import studentController from "../controllers/studentController.js";

const router = express.Router();

router.post("/students",parser.single("image"), studentController.addStudents);
router.get("/students", studentController.getStudents);
router.get("/students/:id", studentController.getStudentById);
router.put("/students/:id", studentController.updateStudent);
router.delete("/students/:id", studentController.deleteStudent); 




export default router;
