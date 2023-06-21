import dotenv from 'dotenv';
dotenv.config();

import express, { Request } from 'express';
const app = express();
import cors from 'cors';
import morgan from 'morgan';
import { router as lessonRoutes } from './lesson/lesson.routes.js';
import { router as boardRoutes } from './board/board.routes.js';
import { PrismaClient } from '@prisma/client';

app.use(cors());
app.use(express.json());

morgan.token('body', (req: Request) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const prisma = new PrismaClient();

const routerV1 = express.Router();
routerV1.use('/lesson', lessonRoutes);
routerV1.use('/board', boardRoutes);
app.use('/v1', routerV1);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
