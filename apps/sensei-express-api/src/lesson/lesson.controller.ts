import { Request, Response } from 'express';
import { LessonService } from './lesson.service.js';
import { LessonRouteParams } from './types/index.js';

export class LessonController {
    lessonService: LessonService;

    constructor() {
        this.lessonService = new LessonService();
    }

    getLesson = async (req: Request<LessonRouteParams>, resp: Response) => {
        if (!req.params.alphabet || !req.params.lessonLevel || !req.params.lessonType) {
            throw new Error('Request error');
        }

        const { alphabet, lessonLevel, lessonType } = req.params;
        const lesson = await this.lessonService.getLesson(alphabet, lessonLevel, lessonType);
        resp.json(lesson);
    };
}
