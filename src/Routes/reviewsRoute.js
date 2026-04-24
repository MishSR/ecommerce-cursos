import express from "express";
import { body, param } from "express-validator";
import {
    getReviews,
    getReviewById,
    createReview,
} from "../Controllers/reviewsController.js";
import validate from "../Middlewares/validation.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import isAdmin from "../Middlewares/isAdminMiddleware.js";
import Review from "../Models/Reviews.js"; // ✅ se importa el modelo para PUT y DELETE

const router = express.Router();

const reviewIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Review ID must be a valid MongoDB ObjectId"),
];

const createReviewValidation = [
    body("user_id")         // ✅ campo real del modelo
        .notEmpty().withMessage("user_id is required")
        .isMongoId().withMessage("user_id must be a valid MongoDB ObjectId"),
    body("course_id")       // ✅ campo real del modelo
        .notEmpty().withMessage("course_id is required")
        .isMongoId().withMessage("course_id must be a valid MongoDB ObjectId"),
    body("rating")          // ✅ campo real del modelo
        .notEmpty().withMessage("Rating is required")
        .isInt({ min: 1, max: 5 }).withMessage("Rating must be an integer between 1 and 5"),
    body("comment")         // ✅ campo real del modelo
        .notEmpty().withMessage("Comment is required")
        .isLength({ min: 5, max: 500 }).withMessage("Comment must be between 5 and 500 characters"),
];

const updateReviewValidation = [
    body("rating")
        .optional()
        .isInt({ min: 1, max: 5 }).withMessage("Rating must be an integer between 1 and 5"),
    body("comment")
        .optional()
        .isLength({ min: 5, max: 500 }).withMessage("Comment must be between 5 and 500 characters"),
];

router.get("/reviews", authMiddleware, isAdmin, getReviews);
router.get("/reviews/:id", authMiddleware, isAdmin, reviewIdValidation, validate, getReviewById);
router.post("/reviews", authMiddleware, createReviewValidation, validate, createReview);

router.put("/reviews/:id", authMiddleware, isAdmin, [...reviewIdValidation, ...updateReviewValidation], validate, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const review = await Review.findByIdAndUpdate(
            id,
            {
                ...(rating !== undefined && { rating }),
                ...(comment !== undefined && { comment })
            },
            { new: true }
        ).populate("user_id", "name").populate("course_id", "title");

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
});

router.delete("/reviews/:id", authMiddleware, isAdmin, reviewIdValidation, validate, async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        next(error);
    }
});

export default router;