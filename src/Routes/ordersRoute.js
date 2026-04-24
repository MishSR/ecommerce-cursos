import express from 'express';
import { body, param } from 'express-validator';
import {
    createOrder,
    getOrders,
    getOrderById,
    getOrdersByUser,
    updateOrder,
    deleteOrder
} from '../Controllers/ordersController.js';
import validate from '../Middlewares/validation.js';
import authMiddleware from '../Middlewares/authMiddleware.js';

const router = express.Router();

const orderIdValidation = [
    param('id').isMongoId().withMessage('Invalid order ID'), // ✅ mensaje específico de orden
];

const userIdValidation = [
    param('id').isMongoId().withMessage('Invalid user ID'),  // ✅ mensaje específico de usuario
];

const orderBodyValidation = [
    body('user')
        .notEmpty().withMessage('User is required')
        .isMongoId().withMessage('User must be a valid MongoDB ObjectId'),
    body('items')
        .isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
    body('items.*.courses')
        .isMongoId().withMessage('Each item must have a valid course ID'),
    body('items.*.quantity')
        .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('total_price')
        .notEmpty().withMessage('Total price is required')
        .isNumeric().withMessage('Total price must be a number'),
    body('status')
        .notEmpty().withMessage('Status is required')
        .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
        .withMessage('Invalid status value'),
];

router.get('/Order', authMiddleware, getOrders);

router.get('/Order/:id', authMiddleware, orderIdValidation, validate, getOrderById);

router.get('/Order/user/:id', authMiddleware, userIdValidation, validate, getOrdersByUser);

router.post('/Order', authMiddleware, orderBodyValidation, validate, createOrder);

router.put('/Order/:id', authMiddleware, [...orderIdValidation, ...orderBodyValidation], validate, updateOrder);

router.delete('/Order/:id', authMiddleware, orderIdValidation, validate, deleteOrder);

export default router;