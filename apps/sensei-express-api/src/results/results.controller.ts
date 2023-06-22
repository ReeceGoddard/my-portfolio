import { Request, Response } from 'express';
import { ResultsService } from './results.service.js';
import { Prisma } from '../database/PrismaClient.js';

export type Result = {
    userID: string;
    characterID: string;
    isCorrect: boolean;
    userAnswer: string;
};

export type ResultsPostAPIPayload = {
    results: Result[];
};

export class ResultsController {
    resultsService: ResultsService;

    constructor() {
        this.resultsService = new ResultsService();
    }

    saveResults = async (req: Request<null, null, ResultsPostAPIPayload>, resp: Response) => {
        try {
            // if (!(req.body.results instanceof Array)) throw new Error('Request error');
            if (req.body.results.length < 1) throw new Error('Must not provide an empty array');

            const results: Prisma.AnswerHistoryCreateManyInput[] = req.body.results;

            await this.resultsService.saveResults(results);
            resp.sendStatus(200);
        } catch (error) {
            console.error('An error occurred:', error);
            resp.status(500).json({ message: 'Internal Server Error', error });
        }
    };
}
