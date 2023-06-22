import express from 'express';
import { ResultsController } from './results.controller.js';

export const router = express.Router();
const resultsController = new ResultsController();

router.post('/', resultsController.saveResults);
