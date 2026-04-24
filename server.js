import express, { json } from 'express';
import dotev from 'dotenv';
import connectDB from './src/Config/db.config.js';
import errorHandler from './src/Middlewares/errorHandler.js';
import logger from './src/Middlewares/logger.js';
import routes from './src/Routes/index.js';

dotev.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

connectDB();

app.get('/', (req, res) => {
    res.send("e-commerce API courses is running");
});

app.use('/api', routes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found", method: req.method, url: req.originalUrl });
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});