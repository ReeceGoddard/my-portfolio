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
    selectedCurrency: CurrencyEntry;
    conversions: CurrencyEntry[];
}
