import { MainLayout } from '../layouts/MainLayout';
import { Outlet } from 'react-router-dom';
import { CurrencySelector } from '../components/CurrencySelector';
import { QueryClient } from '@tanstack/react-query';
import { CurrencyProvider } from '../providers/CurrencyProvider';
import { currencyListQuery } from '../services/queries/CurrencyQueries';

export const loader = (queryClient: QueryClient) => async () => {
    const query = currencyListQuery();
    return queryClient.ensureQueryData(query);
};

export const IndexPage = () => {
    return (
        <CurrencyProvider>
            <MainLayout>
                <MainLayout.Slot name="selector">
                    <CurrencySelector />
                </MainLayout.Slot>
                <MainLayout.Slot name="content">
                    <Outlet />
                </MainLayout.Slot>
            </MainLayout>
        </CurrencyProvider>
    );
};
