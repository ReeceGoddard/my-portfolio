import express from 'express';
import { BoardController } from './board.controller.js';

export const router = express.Router();
const boardController = new BoardController();

router.get('/:alphabet', boardController.getBoardChars);
