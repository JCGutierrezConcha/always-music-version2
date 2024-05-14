import { Router } from "express";
import { controllerStudent } from "../controllers/student.controller.js";

const router = Router();

router.get("/students", controllerStudent.getAllStudents);

router.get("/students/:id", controllerStudent.getOneStudent);

router.post("/students", controllerStudent.createStudent);

router.delete("/students/:id", controllerStudent.removeStudent);

router.put("/students/:id", controllerStudent.updateStudent);

export default router;