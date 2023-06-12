import { ExtractFnReturnType, QueryConfig } from '@lib/react-query';
import { Lesson, Question } from '../types';

export type LessonType = 'writing' | 'multi';

const questionLibrary: Question[] = [
    { id: '1', createdAt: 1, question: 'あ', answer: 'a' },
    { id: '2', createdAt: 1, question: 'い', answer: 'i' },
    { id: '3', createdAt: 1, question: 'う', answer: 'u' },
    { id: '4', createdAt: 1, question: 'え', answer: 'e' },
    { id: '5', createdAt: 1, question: 'お', answer: 'o' },
];

const getRandomChoices = (questionToIgnore: Question): string[] => {
    return questionLibrary
        .filter(libraryQuestion => libraryQuestion.answer !== questionToIgnore.answer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(question => question.answer);
};

//TODO: Allow for flipping the lesson, where English letter is shown and 4 Hiragana chars as options
export const getLesson = (type: LessonType = 'writing'): Promise<Lesson> => {
    return new Promise<Lesson>(resolve => {
        const lessonQuestions = questionLibrary.slice().sort(() => Math.random() - 0.5);

        if (type === 'multi') {
            const updatedQuestions = lessonQuestions.map(lessonQuestion => {
                const choices: string[] = getRandomChoices(lessonQuestion);
                choices.push(lessonQuestion.answer);
                choices.sort(() => Math.random() - 0.5);
                return { ...lessonQuestion, choices };
            });

            resolve({
                id: '1',
                createdAt: 1,
                questions: updatedQuestions,
            });
        }

        resolve({
            id: '1',
            createdAt: 1,
            questions: lessonQuestions,
        });
    });
};

type QueryFnType = typeof getLesson;

type UseLessonOptions = {
    config?: QueryConfig<QueryFnType>;
};

// export const useLesson = ({ config }: UseLessonOptions = {}) => {
//     return useQuery<ExtractFnReturnType<QueryFnType>>({
//         ...config,
//         queryKey: ['lesson'],
//         queryFn: getLesson,
//     });
// };
