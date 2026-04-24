import express from "express";
import { body, param } from "express-validator";
import {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} from "../Controllers/coursesController.js";
import validate from "../Middlewares/validation.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import isAdmin from "../Middlewares/isAdminMiddleware.js";

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
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 20, max: 200 })
        .withMessage("Description must be between 20 and 200 characters"),
    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isNumeric()
        .withMessage("Price must be a number"),
    body("duration")
        .notEmpty()
        .withMessage("Duration is required"),
    body("instructor")
        .notEmpty()
        .withMessage("Instructor is required"),
    body("category")
        .notEmpty()
        .withMessage("Category is required")
        .isMongoId()
        .withMessage("Category must be a valid MongoDB ObjectId"),
];

router.get("/", getCourses);
router.get("/:id", courseIdValidation, validate, getCourseById);

router.post("/", authMiddleware, isAdmin, createCourseValidation, validate, createCourse);
router.put("/:id", authMiddleware, isAdmin, [...courseIdValidation, ...createCourseValidation], validate, updateCourse);
router.delete("/:id", authMiddleware, isAdmin, courseIdValidation, validate, deleteCourse);

export default router;