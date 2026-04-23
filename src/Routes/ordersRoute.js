import express from 'express';
import { body, param } from 'express-validator';
import { createOrder, getOrders, getOrderById, getOrdersByUser, updateOrder, deleteOrder} from '../Controllers/ordersController.js';
import validate from '../Middlewares/validation.js';
import authMiddleware from '../Middlewares/authMiddleware.js';

const router = express.Router();

const orderValidation = [
    body('productId').isMongoId().withMessage('Invalid product ID'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

router.post('/Order', authMiddleware, orderValidation, validate, createOrder);

router.get('/Order', authMiddleware, getOrders);

router.get('/Order/:id', authMiddleware, param('id').isMongoId().withMessage('Invalid order ID'), validate, getOrderById);

router.get('/Order/user/:id', authMiddleware, param('id').isMongoId().withMessage('Invalid user ID'), validate, getOrdersByUser);

router.post('/Order', authMiddleware, orderValidation, validate, createOrder);

router.put('/Order/:id', authMiddleware, [
    param('id').isMongoId().withMessage('Invalid order ID'),
    ...orderValidation
], validate, updateOrder);

router.delete('/Order/:id', authMiddleware, param('id').isMongoId().withMessage('Invalid order ID'), validate, deleteOrder);

export default router;