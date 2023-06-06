import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage';
import { IndexPage, loader as indexLoader } from './pages/IndexPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CurrencyProfile } from './components/CurrencyProfile';
import { ThemeProvider } from './providers/ThemeProvider';
import { currencyProfileLoader } from './components/CurrencyProfileLoader';

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
                    loader: currencyProfileLoader(queryClient),
                },
            ],
        },
    ]);

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                <RouterProvider router={router} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
