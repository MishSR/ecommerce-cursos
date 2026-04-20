import express from "express"; 
import {body , param} from "express-validator";
import {
    getPayment,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment, 
} from "../Controllers/paymentCrontoller.js";
import validate from "../Middlewares/validation.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import isAdmin from "../Middlewares/isAdmin.js";

const router = express.Router();

const paymentIdValidation = [param("id") 
    .isMongoId()
    .withMessage("Payment ID must be a valid MongoDB ObjectId")];

const createPaymentValidation = [
    body("user")
        .notEmpty()
        .withMessage("User is required")
        .isMongoId()
        .withMessage("User ID must be a valid MongoDB ObjectId"),
        body("type")
            .notEmpty()
            .withMessage("Payment type is required")
            .isIn(["credit_card", "paypal", "bank_transfer"])
            .withMessage("Invalid payment type, must be one of: credit_card, paypal, bank_transfer"),
    body("isDefault")
        .optional()
        .isBoolean()
        .withMessage("isDefault must be a boolean value"),
];

const updatePaymentValidation = [
    param("id")
        .isMongoId()
        .withMessage("Payment ID must be a valid MongoDB ObjectId"),
    body("type")
        .optional()
        .isIn(["credit_card", "paypal", "bank_transfer"])
        .withMessage("Invalid payment type, must be one of: credit_card, paypal, bank_transfer"),
    body("isDefault")
        .optional()
        .isBoolean()
        .withMessage("isDefault must be a boolean value"),
    body("cardNumber")
        .optional()
        .isLength({ max: 16 })
        .withMessage("Card number must be at most 16 characters long"),
];

router.get("/payment", authMiddleware, isAdmin, getPayment);

router.get("/payment/:id", authMiddleware, isAdmin, paymentIdValidation, validate, getPaymentById);

router.post("/payment", authMiddleware, createPaymentValidation, validate, createPayment);

router.put("/payment/:id", authMiddleware, isAdmin, updatePaymentValidation, validate, updatePayment);

router.delete("/payment/:id", authMiddleware, isAdmin, paymentIdValidation, validate, deletePayment);


export default router;