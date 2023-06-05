import { Currency, CurrencyData } from '../../types';
import { convertCurrencyDataToHistory, getDateStringsFromToday } from '../../utils';
import { fetchCurrencies, fetchCurrencyData } from '../CurrencyService';

export const currencyListQuery = () => ({
    queryKey: ['currency-list'],
    queryFn: fetchCurrencies,
});

export const currencyDataQuery = (currency: Currency, numOfDays = 7) => ({
    queryKey: ['currency-data', currency.code],
    queryFn: async () => {
        const dateStrings: string[] = getDateStringsFromToday(numOfDays); // Get list of formatted date strings that match API format
        const fetchPromises = dateStrings.map(dateString => fetchCurrencyData(currency.code, dateString));
        const currencyDataList: CurrencyData[] = await Promise.all(fetchPromises);
        const conversionHistory = convertCurrencyDataToHistory(currency, currencyDataList); // Map API response to local data model
        return conversionHistory;
    },
});
