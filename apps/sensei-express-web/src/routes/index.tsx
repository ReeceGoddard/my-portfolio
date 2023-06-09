import { LoaderFunctionArgs, createBrowserRouter, redirect } from 'react-router-dom';

// import { Landing } from '@/features/misc';
// import { useAuth } from '@/lib/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { DashboardPage } from '@pages/dashboard/DashboardPage';
import { LessonPage } from '@pages/lesson/LessonPage';
import { queryClient } from '@/lib/react-query';
import { QueryClient } from '@tanstack/react-query';
import { LessonType, getLesson } from '@/pages/lesson/api/getLesson';
import { ResultsPage } from '@/pages/results/ResultsPage';

export const AppRoutes = () => {
    // const auth = useAuth();
    // const auth = { user: null };
    // const commonRoutes = [{ path: '/', element: <LandingPage /> }];
    // const routes = auth.user ? protectedRoutes : publicRoutes;
    // const element = useRoutes([...routes, ...commonRoutes]);
    // return <>{element}</>;
};

export const lessonQuery = (lessonType: LessonType = 'writing') => ({
    queryKey: ['lesson'],
    queryFn: () => getLesson(lessonType),
});

const lessonLoader =
    (queryClient: QueryClient) =>
    async ({ params }: LoaderFunctionArgs) => {
        if (!params.lessonType) throw new Error('Lesson type not provided.');
        const lesson = await queryClient.ensureQueryData(lessonQuery(params.lessonType));
        return lesson;
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
        path: '/lesson/:lessonType',
        loader: lessonLoader(queryClient),
        Component: LessonPage,
    },
    {
        path: 'results',
        Component: ResultsPage,
    },
]);
