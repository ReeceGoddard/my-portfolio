import { Request, Response } from 'express';
import { prisma } from '../database/PrismaClient.js';

export class BoardController {
    constructor() {}

    async getBoardChars(req: Request, resp: Response) {
        const chars = await prisma.character.findMany({
            where: {
                alphabet: {
                    equals: 'hiragana',
                },
            },
        });

        resp.json(chars);
    }
}
