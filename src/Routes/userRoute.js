import express from "express";
import {body, param} from "express-validator";
import { getUserById, getUsers, createUser, updateUser, deleteUser} from "../Controllers/userController.js";
import validate from "../Middlewares/validation.js";
import isAdmin from "../Middlewares/isAdminMiddleware.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();

const userValidation = [
    param ("id").isMongoId().withMessage("Invalid user ID"),
];

const createUserValidation = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    body ("role").optional().isIn(["customer", "admin"]).withMessage("Role must be either 'customer' or 'admin'")
];
const updateUserValidation = createUserValidation;

router.get("/User", authMiddleware, isAdmoin, getUsers);

router.get("/User/:id", authMiddleware, isAdmoin, getUserById);

router.post("/User", authMiddleware, isAdmoin, createUserValidation, validate, createUser);

router.put("/User/:id", authMiddleware, isAdmoin, [...userValidation, ...updateUserValidation], validate, updateUser);

router.delete("/User/:id", authMiddleware, isAdmoin, userValidation, validate, deleteUser);

export default router;



