import { useQuery } from '@tanstack/react-query';
import React, { ChangeEvent, useMemo, useState } from 'react';
import './CurrencyList.css';
import { Link } from 'react-router-dom';

interface Currency {
    code: string;
    label: string;
}

interface CurrenciesResponse {
    [key: string]: string;
}

interface CurrencyListProps {
    options: Currency[];
    isLoading: boolean;
}

export const CurrencyList = ({ options, isLoading }: CurrencyListProps): JSX.Element => {
    // const fetchCurrencies = async (): Promise<Currency[]> => {
    //     const response = await fetch(
    //         'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json'
    //     );
    //     const currenciesObject: CurrenciesResponse = await response.json();
    //     const currenciesArray = Object.entries(currenciesObject);
    //     return currenciesArray.map(([key, value]) => ({ code: key, label: value }));
    // };

    // const { isLoading, error, data } = useQuery<Currency[], Error>({
    //     queryKey: ['currencies'],
    //     queryFn: fetchCurrencies,
    // });

    const [searchText, setSearchText] = useState<string>('');
    const [selectedCurrency, setSelectedCurrency] = useState<string>('');

    const filteredCurrencies = useMemo(() => {
        if (!options) {
            return [];
        }

        const lowerCaseSearchText = searchText.toLowerCase();

        return options.filter(
            item =>
                item.code.toLowerCase().includes(lowerCaseSearchText) ||
                item.label.toLowerCase().includes(lowerCaseSearchText)
        );
    }, [options, searchText]);

    // if (isLoading) return <div>Loading...</div>;

    // if (error) return <div>`An error has occured: ${error.message}`</div>;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedCurrency(event.target.value);
    };

    return (
        <div className={isLoading ? 'wrapper loading' : 'wrapper'}>
            <input type="text" onInput={handleInputChange} placeholder="Filter..." />
            {filteredCurrencies?.map(currency => (
                <Link to={`/currency/${currency.code}`} key={currency.code}>
                    <label>
                        <input
                            type="radio"
                            name="currency-options"
                            value={currency.code}
                            checked={selectedCurrency === currency.code}
                            onChange={() => setSelectedCurrency(currency.code)}
                        />
                        {currency.label} ({currency.code.toLocaleUpperCase()})
                    </label>
                </Link>
            ))}
            {/* <pre>{JSON.stringify(data, null, 3)}</pre> */}
        </div>
    );
};
