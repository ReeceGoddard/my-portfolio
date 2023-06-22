import { AlphabetType } from '@prisma/client';

export type LessonRouteParams = {
    alphabet: AlphabetType;
    lessonType: LessonType;
    lessonLevel: LessonLevel;
};

export type LessonType = 'multi' | 'writing' | 'mixed';
export type LessonLevel = 'vowels' | 'basic' | 'intermediate' | 'full';
