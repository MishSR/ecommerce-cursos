import express from "express";
import { body, param } from "express-validator";
import {
    getCart,
    getCartById,
    getCartByUser,
    createCart,
    updateCart,
    deleteCart,
} from "../Controllers/cartController.js";
import validate from "../Middlewares/validation.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import isAdmin from "../Middlewares/isAdminMiddleware.js";

const router = express.Router();

const cartIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Cart ID must be a valid MongoDB ObjectId"),
];

const userIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("User ID must be a valid MongoDB ObjectId"),
];

const createCartValidation = [
    body("user_id")
        .notEmpty().withMessage("user_id is required")
        .isMongoId().withMessage("user_id must be a valid MongoDB ObjectId"),
    body("items")
        .isArray({ min: 1 }).withMessage("items must be a non-empty array"),
    body("items.*.course_id")
        .notEmpty().withMessage("Each item must include course_id")
        .isMongoId().withMessage("course_id must be a valid MongoDB ObjectId"),
    body("items.*.quantity")
        .isInt({ min: 1 }).withMessage("quantity must be an integer greater than or equal to 1"),
];

const updateCartValidation = [
    param("id")
        .isMongoId().withMessage("Cart ID must be a valid MongoDB ObjectId"),
    body("user_id")
        .notEmpty().withMessage("user_id is required")
        .isMongoId().withMessage("user_id must be a valid MongoDB ObjectId"),
    body("items")
        .isArray({ min: 1 }).withMessage("items must be a non-empty array"),
    body("items.*.course_id")
        .notEmpty().withMessage("Each item must include course_id")
        .isMongoId().withMessage("course_id must be a valid MongoDB ObjectId"),
    body("items.*.quantity")
        .notEmpty().withMessage("Each item must include quantity")
        .isInt({ min: 1 }).withMessage("quantity must be an integer greater than or equal to 1"),
];

router.get("/Cart", authMiddleware, isAdmin, getCart);

router.get("/cart/:id", authMiddleware, isAdmin, cartIdValidation, validate, getCartById);

router.get("/cart/user/:id", authMiddleware, userIdValidation, validate, getCartByUser);

router.post("/cart", authMiddleware, createCartValidation, validate, createCart);

router.put("/cart/:id", authMiddleware, updateCartValidation, validate, updateCart);

router.delete("/cart/:id", authMiddleware, cartIdValidation, validate, deleteCart);

export default router;