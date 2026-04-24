import express from "express";
import { body, param } from "express-validator";
import {
    getPayments as getPayment,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
} from "../Controllers/paymentController.js";
import validate from "../Middlewares/validation.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import isAdmin from "../Middlewares/isAdminMiddleware.js";

const router = express.Router();

const paymentIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Payment ID must be a valid MongoDB ObjectId"),
];

const createPaymentValidation = [
    body("user")
        .notEmpty().withMessage("User is required")
        .isMongoId().withMessage("User ID must be a valid MongoDB ObjectId"),
    body("method")                                          
        .notEmpty().withMessage("Payment method is required")
        .isIn(["Credit Card", "Debit Card", "Paypal", "Bank Transfer"]) 
        .withMessage("Invalid payment method, must be one of: Credit Card, Debit Card, Paypal, Bank Transfer"),
    body("cardNumber")
        .optional()
        .isLength({ max: 16 }).withMessage("Card number must be at most 16 characters"),
    body("cardHolder")
        .optional()
        .notEmpty().withMessage("Card holder name cannot be empty"),
    body("expiryDate")
        .optional()
        .notEmpty().withMessage("Expiry date cannot be empty"),
    body("isADefault")                                      
        .optional()
        .isBoolean().withMessage("isADefault must be a boolean value"),
    body("isActive")
        .optional()
        .isBoolean().withMessage("isActive must be a boolean value"),
];

const updatePaymentValidation = [
    param("id")
        .isMongoId().withMessage("Payment ID must be a valid MongoDB ObjectId"),
    body("method")                                          
        .optional()
        .isIn(["Credit Card", "Debit Card", "Paypal", "Bank Transfer"]) 
        .withMessage("Invalid payment method, must be one of: Credit Card, Debit Card, Paypal, Bank Transfer"),
    body("cardNumber")
        .optional()
        .isLength({ max: 16 }).withMessage("Card number must be at most 16 characters long"),
    body("isADefault")                                      
        .optional()
        .isBoolean().withMessage("isADefault must be a boolean value"),
    body("isActive")
        .optional()
        .isBoolean().withMessage("isActive must be a boolean value"),
];

router.get("/payment", authMiddleware, isAdmin, getPayment);

router.get("/payment/:id", authMiddleware, isAdmin, paymentIdValidation, validate, getPaymentById);

router.post("/payment", authMiddleware, createPaymentValidation, validate, createPayment);

router.put("/payment/:id", authMiddleware, isAdmin, updatePaymentValidation, validate, updatePayment);

router.delete("/payment/:id", authMiddleware, isAdmin, paymentIdValidation, validate, deletePayment);

export default router;