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

export const getLesson = (type: LessonType = 'writing'): Promise<Lesson> => {
    //TODO: Get questions from server
    // return axios.get(`/lesson`);

    return new Promise<Lesson>(resolve => {
        const lessonQuestions = questionLibrary.sort(() => Math.random() - 0.5);

        if (type === 'multi') {
            lessonQuestions.forEach(lessonQuestion => {
                const choices: string[] = getRandomChoices(lessonQuestion);
                choices.push(lessonQuestion.answer);
                choices.sort(() => Math.random() - 0.5);
                lessonQuestion.choices = choices;
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
