import { AlphabetType, Character } from '@prisma/client';
import { prisma } from '../database/PrismaClient.js';
import { LessonType } from './types/index.js';

export type Question = {
    question: string;
    answer: string;
    charID: string;
    choices?: string[];
};

export type Lesson = {
    questions: Question[];
};

export class LessonService {
    async getLesson(alphabet: AlphabetType, lessonType: LessonType): Promise<Lesson> {
        return this.generateLesson(alphabet, lessonType);
    }

    private shuffleArray<T>(array: T[]): T[] {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    private getRandomChar(chars: Character[]): Character {
        const randomIndex = Math.floor(Math.random() * chars.length);
        return chars[randomIndex];
    }

    private async generateLesson(alphabet: AlphabetType, lessonType: LessonType, numOfQuestions = 12): Promise<Lesson> {
        const allCharacters = await prisma.character.findMany(); //TODO: Get chars based on alphabet provided
        const allCharactersShuffled = this.shuffleArray(allCharacters);

        const questions: Question[] = allCharactersShuffled.slice(0, numOfQuestions).map(char => {
            let question: Question = { question: char.character, answer: char.romaji, charID: char.id };

            if (lessonType === 'multi' || (lessonType === 'mixed' && Math.random() < 0.5)) {
                question.choices = this.getRandomChoices(question, allCharacters);
            }

            return question;
        });

        const lesson: Lesson = {
            questions,
        };

        return lesson;
    }

    /**
     *
     * @param question The question to get choices for.
     * @param charList The list of characters to get choices from.
     * @returns The array of choices.
     */
    private getRandomChoices(question: Question, charList: Character[]): string[] {
        const choices = [question.answer];
        while (choices.length < 4) {
            const randomChar = this.getRandomChar(charList);

            if (!choices.includes(randomChar.romaji)) {
                choices.push(randomChar.romaji);
            }
        }
        choices.sort(() => Math.random() - 0.5);
        return choices;
    }
}
