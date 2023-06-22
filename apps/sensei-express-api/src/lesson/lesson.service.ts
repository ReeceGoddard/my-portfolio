import { AlphabetType, Character } from '@prisma/client';
import { prisma } from '../database/PrismaClient.js';
import { LessonLevel, LessonType } from './types/index.js';

export type CharacterWithChoices = {
    question: string;
    answer: string;
    choices?: string[];
} & Character;

export type Lesson = {
    questions: CharacterWithChoices[];
};

export class LessonService {
    async getLesson(alphabet: AlphabetType, lessonLevel: LessonLevel, lessonType: LessonType): Promise<Lesson> {
        return this.generateLesson(alphabet, lessonLevel, lessonType);
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

    private async generateLesson(
        alphabet: AlphabetType,
        lessonLevel: LessonLevel,
        lessonType: LessonType,
        numOfQuestions = 12
    ): Promise<Lesson> {
        const allCharacters = await prisma.character.findMany({
            where: {
                alphabet: {
                    equals: alphabet,
                },
            },
        });
        const allCharactersShuffled = this.shuffleArray(allCharacters);
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        const filteredQuestions = allCharactersShuffled.filter(character => vowels.includes(character.romaji));
        const questions: CharacterWithChoices[] = Array.from({ length: 12 }, () => {
            const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
            const char = filteredQuestions[randomIndex];
            const question: CharacterWithChoices = { ...char, question: char.character, answer: char.romaji };

            if (lessonType === 'multi' || (lessonType === 'mixed' && Math.random() < 0.5)) {
                question.choices = this.getRandomChoices(question, filteredQuestions);
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
    private getRandomChoices(question: CharacterWithChoices, charList: Character[], type?: keyof Character): string[] {
        const choices = [question.romaji];
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
