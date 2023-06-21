import { LoaderFunctionArgs, createBrowserRouter, redirect } from 'react-router-dom';

import { DashboardPage } from '@pages/dashboard/DashboardPage';
import { LessonPage } from '@pages/lesson/LessonPage';
import { queryClient } from '@/lib/react-query';
import { LessonLevel, LessonType, getLesson } from '@/pages/lesson/api/getLesson';
import { ResultsPage } from '@/pages/results/ResultsPage';
import { HiraganaBoard } from '@/pages/board/HiraganaBoard';
import { BoardType, kanaCharsQuery } from '@/pages/board/api/getKanaChars';

export const lessonQuery = (lessonType: LessonType = 'writing') => ({
    queryKey: ['lesson'],
    queryFn: () => getLesson(lessonType),
});

const lessonLoader = async ({ params }: LoaderFunctionArgs) => {
    if (!params.lessonType) throw new Error('Lesson type not provided.');
    const lesson = await getLesson(params.lessonLevel as LessonLevel, params.lessonType as LessonType);
    return lesson;
};

const boardLoader = async ({ params }: LoaderFunctionArgs) => {
    if (!params.boardType) throw new Error('Board type type not provided.');
    const chars = await queryClient.ensureQueryData(kanaCharsQuery({ boardType: params.boardType as BoardType }));
    return chars;
};

export const router = createBrowserRouter([
    {
        path: '/',
        loader: async () => {
            return redirect('/dashboard');
        },
    },
    {
        path: '/dashboard',
        Component: DashboardPage,
    },
    {
        path: '/lesson/hiragana/:lessonLevel/:lessonType',
        loader: lessonLoader,
        element: <LessonPage />,
    },
    {
        path: '/results',
        Component: ResultsPage,
    },
    {
        path: '/board/:boardType',
        element: <HiraganaBoard />,
        loader: boardLoader,
    },
]);
