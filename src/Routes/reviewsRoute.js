import express from "express";
import { body, param } from "express-validator";
import {
    getReviews,
    getReviewById,
    createReview,
} from "../Controllers/reviewsController.js";
import validate from "../Middleware/validate.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import isAdmin from "../Middlewares/isAdminMiddleware";

const router = express.Router();

const reviewValidation = [
    param("id")
        .isMongoId()
        .withMessage("Review ID must be a valid MongoDB ObjectId"),
];

const createReviewValidation = [
    body("title")
        .notEmpty()
        .withMessage("Review title is required"),
    body("description")
        .optional()
        .isLength({ min: 20, max: 200 })
        .withMessage("Review description must be between 20 and 200 characters"),
];

router.get("/reviews", authMiddleware, isAdmin, getReviews);

router.get("/reviews/:id", authMiddleware, isAdmin, reviewValidation, validate, getReviewById);

router.post("/reviews", authMiddleware, isAdmin, createReviewValidation, validate, createReview);

router.put("/reviews/:id", authMiddleware, isAdmin, [...reviewValidation, ...createReviewValidation], validate,);

router.delete("/reviews/:id", authMiddleware, isAdmin, reviewValidation, validate,);    

export default router;