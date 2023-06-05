export interface Currency {
    code: string;
    label: string;
}

export interface CurrencyListAPIResponse {
    [key: string]: string;
}

export interface CurrencyDataAPIResponse {
    [key: string]: string | object;
}

export interface CurrencyEntry {
    code: string;
    label: string;
    rate: number;
}

export interface CurrencyData {
    date: string;
    baseCurrency: CurrencyEntry;
    conversions: CurrencyEntry[];
}

export interface CurrencyHistory {
    baseCurrency: CurrencyEntry;
    data: CurrencyData[];
}

export interface BaseCurrency {
    currencyCode: string;
    label: string;
}

export interface CurrencyConversion {
    currencyCode: string;
    conversionHistory: RateForDate[];
}

export interface RateForDate {
    date: string;
    rate: number;
}

export interface ConversionsHistoryForCurrency {
    baseCurrency: BaseCurrency;
    currencyConversions: CurrencyConversion[];
}
