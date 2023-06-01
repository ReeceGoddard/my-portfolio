import { CurrencyListAPIResponse, Currency, CurrencyData, CurrencyDataAPIResponse } from '../types';
import { mapCurrencyAPIResponse } from '../utils';

/**
 * Fetches a list of available currencies.
 * @returns A Promise that resolves to the currency list.
 */
export const fetchCurrencies = async (): Promise<Currency[]> => {
    const CURRENCY_LIST_API_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json';
    const response = await fetch(CURRENCY_LIST_API_URL);
    const currenciesObject: CurrencyListAPIResponse = await response.json();
    const currenciesArray = Object.entries(currenciesObject);
    return currenciesArray.map(([key, value]) => <Currency>{ code: key, label: value });
};

/**
 * Fetches currency data for a specific currency code and date.
 *
 * @param currencyCode The currency code to get data for.
 * @param date The date to get conversion data for. Defaults to 'latest' if not provided.
 *             Can be either 'latest' to get the latest data or a specific date in the format <b>'YYYY-MM-DD'</b>.
 * @returns A Promise that resolves to the currency data.
 */
export const fetchCurrencyData = async (currencyCode: string, date = 'latest'): Promise<CurrencyData> => {
    const CURRENCY_DATA_API_URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/${currencyCode}.min.json`;
    const response = await fetch(CURRENCY_DATA_API_URL);
    const currencyDataObject: CurrencyDataAPIResponse = await response.json();
    return mapCurrencyAPIResponse(currencyDataObject, currencyCode);
};
