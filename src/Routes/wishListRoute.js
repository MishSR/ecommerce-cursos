import express from "express";
import { body, param } from "express-validator";
import {
    getWishList,
    getWishListByUser,
    addToWishlist,
    removeFromWishList,
    deleteWishList,
} from "../Controllers/wishListController.js";
import validate from "../Middleware/validate.js";
import isAdmin from "../Middleware/isAdmin.js";
import authMiddleware from "../Middleware/authMiddleware.js";

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
    .isMongoId()
    .withMessage("User ID must be a valid MongoDB ObjectId"),
    body("productId")
    .isMongoId()
    .withMessage("Product ID must be a valid MongoDB ObjectId"),
];

const removeFromWishListValidation = [
    param("id")
    .isMongoId()
    .withMessage("WishList ID must be a valid MongoDB ObjectId"),
    body("productId")
    .isMongoId()
    .withMessage("Product ID must be a valid MongoDB ObjectId"),
];

router.get("/wishlist", authMiddleware, isAdmin, getWishList);

router.get("/wishlist/user/:id", authMiddleware, userIdValidation, validate, getWishListByUser);

router.post("/wishlist", authMiddleware, addToWishlistValidation, validate, addToWishlist);

router.delete("/wishlist/:id/product", authMiddleware, removeFromWishListValidation, validate, removeFromWishList);

router.delete("/wishlist/:id", authMiddleware, wishListIdValidation, validate, deleteWishList); 

export default router;

