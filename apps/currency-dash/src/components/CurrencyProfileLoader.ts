import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';
import { currencyDataQuery, currencyListQuery } from '../services/queries/CurrencyQueries';

export const currencyProfileLoader =
    (queryClient: QueryClient) =>
    async ({ params }: LoaderFunctionArgs) => {
        if (params.currencyCode) {
            const currencyList = await queryClient.ensureQueryData(currencyListQuery());
            const baseCurrency = currencyList.find(currency => currency.code === params.currencyCode);

            if (baseCurrency) {
                const query = currencyDataQuery(baseCurrency);
                return queryClient.ensureQueryData(query);
            }
        }
    };
