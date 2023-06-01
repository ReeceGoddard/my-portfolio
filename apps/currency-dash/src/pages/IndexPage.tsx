import { MainLayout } from '../layouts/MainLayout';
import { Outlet } from 'react-router-dom';
import { CurrencyList } from '../components/CurrencyList';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { fetchCurrencies } from '../services/CurrencyService';

const currencyListQuery = () => ({
    queryKey: ['currency-list'],
    queryFn: fetchCurrencies,
});

export const loader = (queryClient: QueryClient) => async () => {
    const query = currencyListQuery();
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export const IndexPage = () => {
    const { data: currencies, isLoading } = useQuery(currencyListQuery());

    return (
        <MainLayout>
            <MainLayout.Slot name="sidebar">
                <CurrencyList options={currencies ?? []} isLoading={isLoading} />
            </MainLayout.Slot>
            <MainLayout.Slot name="content">
                <Outlet />
            </MainLayout.Slot>
        </MainLayout>
    );
};
