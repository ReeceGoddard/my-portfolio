import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs, useLoaderData, useParams } from 'react-router-dom';
import { ConversionCard } from './ConversionCard';
import './CurrencyProfile.css';
import { useCurrencyContext } from '../providers/CurrencyProvider';
import { useCallback, useEffect, useState } from 'react';
import { currencyDataQuery, currencyListQuery } from '../services/queries/CurrencyQueries';
import { ConversionsHistoryForCurrency } from '../types';
import { Tooltip } from './Tooltip';
import { SVGGradientDefs } from './SVGGradientDefs';

export const loader =
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

export const CurrencyProfile = () => {
    const { currencyCode } = useParams<keyof { currencyCode: string }>() as { currencyCode: string };

    const currencyHistory = useLoaderData() as ConversionsHistoryForCurrency; //TODO: Fix typecasting when ReactRouter fixes
    const { setSelectedCurrency, tooltipProps } = useCurrencyContext();
    const [showAllCurrencies, setShowAllCurrencies] = useState<boolean>(false);

    const filterAndSortCurrencies = useCallback(() => {
        const commonCurrencyCodes = [
            'USD',
            'EUR',
            'JPY',
            'GBP',
            'AUD',
            'CAD',
            'CHF',
            'CNY',
            'SEK',
            'NZD',
            'MXN',
            'SGD',
        ];
        return currencyHistory.currencyConversions
            .filter(currency => currency.currencyCode.toUpperCase() !== currencyCode.toUpperCase())
            .filter(currency => commonCurrencyCodes.includes(currency.currencyCode.toUpperCase()))
            .sort((a, b) => {
                const indexA = commonCurrencyCodes.indexOf(a.currencyCode.toUpperCase());
                const indexB = commonCurrencyCodes.indexOf(b.currencyCode.toUpperCase());
                return indexA - indexB;
            });
    }, [currencyHistory.currencyConversions, currencyCode]);

    useEffect(() => setSelectedCurrency(currencyCode), [currencyCode, setSelectedCurrency]);

    return (
        <div className="currency-profile">
            <h1 className="main-heading">
                {currencyHistory?.baseCurrency.label} ({currencyHistory.baseCurrency.currencyCode.toUpperCase()})
            </h1>
            <h3 className="sub-heading">{new Date().toDateString()} — Weekly View</h3>
            <div className="conversions">
                {filterAndSortCurrencies().map(currency => (
                    <ConversionCard
                        key={currency.currencyCode}
                        currencyCode={currency.currencyCode}
                        rates={currency.conversionHistory}
                    />
                ))}
            </div>

            {!showAllCurrencies && (
                <button className="show-all" onClick={() => setShowAllCurrencies(true)}>
                    Show All Currencies
                </button>
            )}

            {showAllCurrencies && (
                <section className="all-currencies">
                    <h2>All Currencies</h2>
                    <div className="conversions">
                        {currencyHistory?.currencyConversions
                            .filter(
                                currency =>
                                    currency.currencyCode.toUpperCase() !==
                                    currencyHistory.baseCurrency.currencyCode.toUpperCase()
                            )
                            .map(currency => (
                                <ConversionCard
                                    key={currency.currencyCode}
                                    currencyCode={currency.currencyCode}
                                    rates={currency.conversionHistory}
                                />
                            ))}
                    </div>
                </section>
            )}

            <SVGGradientDefs />
            <Tooltip {...tooltipProps} />
        </div>
    );
};
