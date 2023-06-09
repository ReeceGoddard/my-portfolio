import { BaseEntity } from '@/types';

export type Question = {
    question: string;
    answer: string;
    choices?: string[];
    userAnswer?: string;
    isCorrect?: boolean;
} & BaseEntity;

export type Lesson = {
    questions: Question[];
} & BaseEntity;

export type LessonResult = {
    questions: Question[];
};
