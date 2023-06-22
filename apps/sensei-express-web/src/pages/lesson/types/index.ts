import { BaseEntity } from '@/types';

export type KanaCharacter = {
    character: string;
    romaji: string;
    row: number;
};

export type Question = {
    id: string;
    question: string;
    answer: string;
    choices?: string[];
    soundUrl: string;
};

export type QuestionWithAnswer = {
    question: Question;
    userID: string;
    userAnswer: string | null;
    isCorrect: boolean | null;
};

export type Lesson = {
    questions: Question[];
} & BaseEntity;

export type LessonResult = {
    questions: Question[];
};

export type GetLessonAPIResponse = {
    questions: Question[];
};
