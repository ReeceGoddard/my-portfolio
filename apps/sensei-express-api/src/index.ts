import dotenv from 'dotenv';
import express, { Request, Router } from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';

import { router as lessonRoutes } from './lesson/lesson.routes.js';
import { router as boardRoutes } from './board/board.routes.js';
import { router as resultsRoutes } from './results/results.routes.js';
import { errorHandler } from './errorHandler.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

morgan.token('body', (req: Request) => {
    return JSON.stringify(req.body);
});

const app = express();
app.disable('x-powered-by');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/public', express.static(path.join(__dirname, '../public')));

const prisma = new PrismaClient();

const routerV1 = Router();
routerV1.use('/lesson', lessonRoutes);
routerV1.use('/board', boardRoutes);
routerV1.use('/results', resultsRoutes);

app.use('/v1', routerV1);

//Generic error handler after all routes
app.use(errorHandler);

app.listen(PORT, async () => {
    try {
        await prisma.$connect();
        console.log(`Connected to the database 🔌`);
        console.log(`Server listening on port ${PORT} 🩺`);
    } catch (error) {
        console.error(`Failed to connect to the database:`, error);
    }
});
