import { CurrencyData, CurrencyDataAPIResponse } from '../types';

export const mapCurrencyAPIResponse = (
    currencyDataResponse: CurrencyDataAPIResponse,
    currencyCode: string
): Promise<CurrencyData> => {
    const currencyData: CurrencyData = {
        date: '',
        selectedCurrency: {
            code: currencyCode,
            label: currencyCode, //TODO: get real label from datastore
            rate: 1,
        },
        conversions: [],
    };

    Object.keys(currencyDataResponse).forEach(key => {
        if (key.toLowerCase() === 'date' && typeof currencyDataResponse[key] === 'string') {
            currencyData.date = currencyDataResponse[key] as string;
        }

        if (key.toLowerCase() === currencyCode.toLowerCase() && typeof currencyDataResponse[key] === 'object') {
            const conversions: [string, number][] = Object.entries(currencyDataResponse[key]);
            conversions.forEach(conversion => {
                currencyData.conversions.push({ code: conversion[0], rate: conversion[1], label: conversion[0] });
            });
        }
    });

    return Promise.resolve(currencyData);
};
