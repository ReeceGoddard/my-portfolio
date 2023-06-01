import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage';
import { IndexPage, loader as indexLoader } from './pages/IndexPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CurrencyProfile, loader as profileLoader } from './components/CurrencyProfile';

function App() {
    const queryClient = new QueryClient();

    const router = createBrowserRouter([
        {
            path: '/',
            element: <IndexPage />,
            errorElement: <ErrorPage />,
            loader: indexLoader(queryClient),
            children: [
                {
                    index: true,
                    element: <div>Choose a currency</div>,
                },
                {
                    path: 'currency/:currencyCode',
                    element: <CurrencyProfile />,
                    loader: profileLoader(queryClient),
                },
            ],
        },
    ]);

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
