import { lazy } from 'react';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { QueryClient } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { authorProfileLoader } from './pages/author-profile/AuthorProfile.loader';
import './App.css';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

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
        },
        {
            path: 'author/:authorName',
            element: <AuthorProfile />,
            loader: () => authorProfileLoader(queryClient),
        },
    ]);

    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister, maxAge: FIVE_DAYS }}>
            <RouterProvider router={router} />
        </PersistQueryClientProvider>
    );
}

export default App;
