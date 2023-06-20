import express from 'express';
import { LessonController } from './lesson.controller.js';

export const router = express.Router();
const lessonController = new LessonController();

router.get('/:alphabet/:lessonLevel/:lessonType', lessonController.getLesson);
