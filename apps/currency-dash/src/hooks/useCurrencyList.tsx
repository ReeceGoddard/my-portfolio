import { useQuery } from '@tanstack/react-query';
import { currencyListQuery } from '../services/queries/CurrencyQueries';
import { Currency } from '../types';

export const useCurrencyList = () => {
    return useQuery<Currency[], Error>(currencyListQuery());
};
