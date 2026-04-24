import express from "express";
import { body } from "express-validator";        
import { login, register } from "../Controllers/authController.js";
import validate from "../Middlewares/validation.js"; 

const router = express.Router();

const registerValidation = [
    body("name")
        .notEmpty().withMessage("Name is required"),
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email"),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email"),
    body("password")
        .notEmpty().withMessage("Password is required"),
];

router.post("/register", registerValidation, validate, register); // ✅
router.post("/login", loginValidation, validate, login);           // ✅

export default router;