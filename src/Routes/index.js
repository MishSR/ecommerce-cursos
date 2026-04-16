import express from 'express';
import paymentRoutes from './paymentRoutes.js';
import userRoutes from './userRoutes.js';
import coursesRoutes from './coursesRoutes.js';
import cartRoutes from './cartRoutes.js';
import wishListRoutes from './wishListRoutes.js';
import reviewsRoutes from './reviewsRoutes.js';

 const router = express.Router();

 router.use('/users', userRoutes);
 router.use('/courses', coursesRoutes);
 router.use('/cart', cartRoutes);
 router.use('/wishlist', wishListRoutes);
 router.use('/payment', paymentRoutes);
 router.use('/reviews', reviewsRoutes);

 export default router;

 