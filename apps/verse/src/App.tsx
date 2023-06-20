import { lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { authorProfileLoader } from './pages/author-profile/AuthorProfile.loader';
import './App.css';

const Authors = lazy(() => import('./pages/authors/Authors'));
const AuthorProfile = lazy(() => import('./pages/author-profile/AuthorProfile'));

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
            },
        },
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
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
