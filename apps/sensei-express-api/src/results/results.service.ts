import { Prisma, prisma } from '../database/PrismaClient.js';

export class ResultsService {
    async saveResults(results: Prisma.AnswerHistoryCreateManyInput[]) {
        return await prisma.answerHistory.createMany({
            data: results,
        });
    }
}
