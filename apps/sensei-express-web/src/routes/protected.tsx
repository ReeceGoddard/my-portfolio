import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// import { Spinner } from '@/components/Elements';
// import { MainLayout } from '@/components/Layout';
// import { lazyImport } from '@/utils/lazyImport';

// const { DiscussionsRoutes } = lazyImport(
//   () => import('@/features/discussions'),
//   'DiscussionsRoutes'
// );
// const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
// const { Profile } = lazyImport(() => import('@/features/users'), 'Profile');
// const { Users } = lazyImport(() => import('@/features/users'), 'Users');

const App = () => {
    return (
        <div className="main-layout">
            <Suspense
                fallback={
                    <div className="spinner">
                        Spinning
                        {/* <Spinner size="xl" /> */}
                    </div>
                }
            >
                <Outlet />
            </Suspense>
        </div>
    );
};

export const protectedRoutes = [
    {
        path: '/app',
        element: <App />,
        children: [
            { path: '/', element: <DashboardPage /> },
            //   { path: '/discussions/*', element: <DiscussionsRoutes /> },
            //   { path: '/users', element: <Users /> },
            //   { path: '/profile', element: <Profile /> },
            //   { path: '*', element: <Navigate to="." /> },
        ],
    },
];
