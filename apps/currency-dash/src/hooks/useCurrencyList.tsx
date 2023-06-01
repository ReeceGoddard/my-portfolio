import { useQuery } from '@tanstack/react-query';

interface Currency {
    code: string;
    label: string;
}

interface CurrenciesResponse {
    [key: string]: string;
}

// const currencyListQuery = () => ({
//     queryKey: ['currencyList'],
//     queryFn: fetchCurrencies,
// });

// export const currencyListLoader = (queryClient: QueryClient) => async () => {
//     const query = currencyListQuery();
//     return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
// };

const QUERY_KEY = ['CurrencyList'];

const fetchCurrencies = async (): Promise<Currency[]> => {
    const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json');
    const currenciesObject: CurrenciesResponse = await response.json();
    const currenciesArray = Object.entries(currenciesObject);
    return currenciesArray.map(([key, value]) => ({ code: key, label: value }));
};

export const useCurrencyList = () => {
    return useQuery<Currency[], Error>(QUERY_KEY, fetchCurrencies);
};
