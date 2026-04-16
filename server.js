import express, { json } from 'express';
import dotev from 'dotenv';
import connectDB from './Config/db.config.js';
import errorHandler from './Middleware/errorHandler.js';
import logger from './Middleware/logger.js';
import { connect } from 'mongoose';
import routes from './Routes/index.js';

dotev.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use(errorHandler);

connectDB();

app.get('/', (req, res) => {
    res.send("e-commerce API courses is running");
});

app.use('/api', routes);

app.use((req, res) => {
    res.status(400),json({message: "Route not found", method: req.method, url: req.originalUrl});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);


