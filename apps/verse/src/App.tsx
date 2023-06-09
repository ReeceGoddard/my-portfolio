import { Suspense, lazy } from 'react';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { QueryClient } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { authorProfileLoader } from './pages/author-profile/AuthorProfile.loader';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { authorsLoader } from './pages/authors/Authors.loader';
import { Helmet } from 'react-helmet';
import './App.css';

const Authors = lazy(() => import('./pages/authors/Authors'));
const AuthorProfile = lazy(() => import('./pages/author-profile/AuthorProfile'));

const FIVE_DAYS = 1000 * 60 * 60 * 24 * 5;

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: FIVE_DAYS,
                cacheTime: FIVE_DAYS,
            },
        },
    });

    const persister = createSyncStoragePersister({
        storage: window.localStorage,
    });

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Authors />,
            loader: () => authorsLoader,
        },
        {
            path: 'author/:authorName',
            element: <AuthorProfile />,
            loader: () => authorProfileLoader(queryClient),
        },
    ]);

    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister, maxAge: FIVE_DAYS }}>
            <Helmet>
                <title>Verse | Masters of Poetry</title>
                <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
                <meta name="theme-color" content="#171719" media="(prefers-color-scheme: dark)" />
            </Helmet>
            <Suspense fallback={<div>Loading... </div>}>
                <RouterProvider router={router} />
            </Suspense>
        </PersistQueryClientProvider>
    );
}

export default App;
