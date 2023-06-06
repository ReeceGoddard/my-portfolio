import { ConversionsHistoryForCurrency, Currency, CurrencyData, CurrencyDataAPIResponse } from '../types';

export const mapCurrencyAPIResponse = (
    currencyDataResponse: CurrencyDataAPIResponse,
    currencyCode: string
): Promise<CurrencyData> => {
    const currencyData: CurrencyData = {
        date: '',
        baseCurrency: {
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

export const convertCurrencyDataToHistory = (
    baseCurrency: Currency,
    currencyDataList: CurrencyData[]
): ConversionsHistoryForCurrency => {
    const BASE_CURRENCY = currencyDataList[0].baseCurrency; // Get baseCurrency from first day, all days should be the same

    // Init object to return
    const conversionHistory: ConversionsHistoryForCurrency = {
        baseCurrency: {
            currencyCode: baseCurrency.code,
            label: baseCurrency.label,
        },
        currencyConversions: [],
    };

    // Map conversion data of a date to specific currency history
    currencyDataList.forEach(dayOfData => {
        dayOfData.conversions.forEach(conversionsForDate => {
            const foundElement = conversionHistory.currencyConversions.find(
                item => item.currencyCode === conversionsForDate.code
            );

            if (!foundElement) {
                // Add new currency to currencyConversions
                conversionHistory.currencyConversions.push({
                    currencyCode: conversionsForDate.code,
                    conversionHistory: [{ rate: conversionsForDate.rate, date: dayOfData.date }],
                });
            } else {
                // Add currency conversion to existing currency in currencyConversions
                foundElement.conversionHistory.push({ rate: conversionsForDate.rate, date: dayOfData.date });
            }
        });
    });

    return conversionHistory;
};

export const getFormattedDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getDateStringsFromToday = (numOfDays = 0) => {
    const date = new Date(); // Init to today
    const dateStrings = [];

    for (let i = 0; i < numOfDays; i++) {
        const dateString = getFormattedDateString(date);
        dateStrings.push(dateString);
        date.setDate(date.getDate() - 1);
    }

    return dateStrings;
};

/**
 * Generates an array of days of the week starting from a specified day or the next day after the current day.
 * @param {number} [startDay] - Optional. The starting day of the week (0 for Sunday, 1 for Monday, and so on).
 * @returns {string[]} - An array of strings representing the days of the week.
 */
export const getDaysOfTheWeekLetters = (startDay?: number): string[] => {
    const dayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // If startDay is not provided, set it to tomorrow
    if (startDay === undefined) {
        startDay = (new Date().getDay() + 1) % dayLetters.length;
    }

    // Calculate the starting index based on the provided startDay
    const startingIndex = startDay % dayLetters.length;

    // Generate the array of days of the week by mapping over the dayLetters array
    return dayLetters.map((_, index) => {
        const newIndex = (startingIndex + index) % dayLetters.length;
        return dayLetters[newIndex];
    });
};

export class Alpha {
    readonly value: number;

    constructor(value: number) {
        if (value < 0 || value > 1) {
            throw new Error('Alpha value must be between 0 and 1.');
        }

        this.value = value;
    }
}

export function addAlphaToHSL(hslString: string, alpha: Alpha) {
    // Remove any leading or trailing spaces from the HSL string
    const trimmedHSL = hslString.trim();

    // Extract the HSL values using regular expressions
    const hslPattern = /hsl\(\s*(\d+),\s*(\d+%?),\s*(\d+%?)\)/;
    const [, hue, saturation, lightness] = trimmedHSL.match(hslPattern);

    // Construct the updated HSL string with alpha
    const updatedHSL = `hsla(${hue}, ${saturation}, ${lightness}, ${alpha.value})`;

    return updatedHSL;
}

// export const getLabelFromCode = (currencyCode: string): string => {
//     const query = currencyListQuery();
//     return queryClient.ensureQueryData(query);

//     if (!data) throw new Error('Currency list not available.');

//     const currency = data.find(item => item.code === currencyCode);

//     if (!currency) throw new Error('Cannot find currency for code provided.');

//     return currency.label;
// };
