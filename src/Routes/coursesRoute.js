import express from "express";
import { body, param } from "express-validator";
import {
    getCourses,
    getCourseById,
} from "../Controllers/coursesController.js";
import validate from "../Middlewares/validation.js";

const router = express.Router();

const courseIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Course ID must be a valid MongoDB ObjectId"),
];

const createCourseValidation = [
    body("title")
        .notEmpty()
        .withMessage("Course title is required"),
    body("description")
        .optional()
        .isLength({ min: 20, max: 200 })
        .withMessage("Course description must be between 20 and 200 characters"),
];

router.get("/courses", getCourses);

router.get("/courses/:id", courseIdValidation, validate, getCourseById);
router.post("/courses", createCourseValidation, validate,);
router.put("/courses/:id", [...courseIdValidation, ...createCourseValidation], validate,);
router.delete("/courses/:id", courseIdValidation, validate,);
export default router;