import express from "express";
import { body, param } from "express-validator";
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../Controllers/categoryController.js";
import validate from "../Middlewares/validation.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import isAdmin from "../Middlewares/isAdminMiddleware.js";

const router = express.Router();

const categoryIdValidation = [
    param("id").isMongoId().withMessage("Category ID must be a valid MongoDB ObjectId"),
];

const categoryBodyValidation = [
    body("name").notEmpty().withMessage("Category name is required"),
    body("description").optional().isLength({ max: 200 }).withMessage("Description max 200 chars"),
];

// GET público
router.get("/", getCategories);
router.get("/:id", categoryIdValidation, validate, getCategoryById);

// Solo admin
router.post("/", authMiddleware, isAdmin, categoryBodyValidation, validate, createCategory);
router.put("/:id", authMiddleware, isAdmin, [...categoryIdValidation, ...categoryBodyValidation], validate, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, categoryIdValidation, validate, deleteCategory);

export default router;