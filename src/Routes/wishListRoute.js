import express from "express";
import { body, param } from "express-validator";
import {
    getWishList,
    getWishListByUser,
    addToWishList as addToWishlist,
    removeFromWishList,
    deleteWishList,
} from "../Controllers/wishListController.js";
import validate from "../Middlewares/validation.js";
import isAdmin from "../Middlewares/isAdminMiddleware.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();

const wishListIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("WishList ID must be a valid MongoDB ObjectId"),
];

const userIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("User ID must be a valid MongoDB ObjectId"),
];

const addToWishlistValidation = [
    body("userId")
        .notEmpty().withMessage("userId is required")
        .isMongoId().withMessage("User ID must be a valid MongoDB ObjectId"),
    body("courseId")                
        .notEmpty().withMessage("courseId is required")
        .isMongoId().withMessage("Course ID must be a valid MongoDB ObjectId"),
];

const removeFromWishListValidation = [
    param("courseId")               
        .isMongoId()
        .withMessage("Course ID must be a valid MongoDB ObjectId"),
];

router.get("/wishlist", authMiddleware, isAdmin, getWishList);
router.get("/wishlist/user/:id", authMiddleware, userIdValidation, validate, getWishListByUser);
router.post("/wishlist", authMiddleware, addToWishlistValidation, validate, addToWishlist);

router.delete("/wishlist/:id/product/:courseId", authMiddleware, removeFromWishListValidation, validate, removeFromWishList); // ✅ :courseId en la URL
router.delete("/wishlist/:id", authMiddleware, wishListIdValidation, validate, deleteWishList);

export default router;