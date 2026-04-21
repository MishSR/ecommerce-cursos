import express from 'express';
import paymentRoutes from './paymentRoute.js';
import userRoutes from './userRoute.js';
import coursesRoutes from './coursesRoute.js';
import cartRoutes from './cartRoute.js';
import wishListRoutes from './wishListRoute.js';
import reviewsRoutes from './reviewsRoute.js';

 const router = express.Router();

 router.use('/users', userRoutes);
 router.use('/courses', coursesRoutes);
 router.use('/cart', cartRoutes);
 router.use('/wishlist', wishListRoutes);
 router.use('/payment', paymentRoutes);
 router.use('/reviews', reviewsRoutes);

 export default router;

 