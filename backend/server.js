import express from 'express';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import showListRoutes from './routes/showListRoutes.js';
import TVshowRoutes from './routes/TVshowRoutes.js';
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/showLists', showListRoutes);
app.use('/api/TVshow', TVshowRoutes);

app.get('/', (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));


