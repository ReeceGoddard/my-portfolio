import { Request, Response } from 'express';
import { LessonService } from './lesson.service.js';
import { LessonRouteParams } from './types/index.js';

export class LessonController {
    lessonService: LessonService;

    constructor() {
        this.lessonService = new LessonService();
    }

    getLesson = async (req: Request<LessonRouteParams>, resp: Response) => {
        if (!req.params.alphabet || !req.params.lessonType) {
            throw new Error('Request error');
        }

        const { alphabet, lessonType } = req.params;
        const lesson = await this.lessonService.getLesson(alphabet, lessonType);
        resp.json(lesson);
    };
}
