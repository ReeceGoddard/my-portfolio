import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

// import { Button, Spinner } from '@/components/Elements';
// import { Notifications } from '@/components/Notifications/Notifications';
// import { AuthProvider } from '@/lib/auth';
import { queryClient } from '@/lib/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
// import { queryClient } from '@/lib/react-query';

const ErrorFallback = () => {
    return (
        <div className="error" role="alert">
            <h2 className="heading">Ooops, something went wrong :(</h2>
            <button onClick={() => window.location.assign(window.location.origin)}>Refresh</button>
        </div>
    );
};

type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <React.Suspense
            fallback={
                <div className="spinner">
                    <div>Spinning</div>
                    {/* <Spinner size="xl" /> */}
                </div>
            }
        >
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <HelmetProvider>
                    <QueryClientProvider client={queryClient}>
                        {/* {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />} */}
                        {/* <Notifications /> */}
                        {/* <AuthProvider> */}
                        {children}
                        {/* </AuthProvider> */}
                    </QueryClientProvider>
                </HelmetProvider>
            </ErrorBoundary>
        </React.Suspense>
    );
};
