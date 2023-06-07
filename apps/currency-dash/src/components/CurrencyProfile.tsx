import { useLoaderData, useParams } from 'react-router-dom';
import { ConversionCard } from './ConversionCard';
import { useCurrencyContext } from '../providers/CurrencyProvider';
import { useCallback, useEffect, useState } from 'react';
import { ConversionsHistoryForCurrency } from '../types';
import { Tooltip } from './Tooltip';
import { SVGGradientDefs } from './SVGGradientDefs';
import styles from './CurrencyProfile.module.css';

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

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 80);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.currencyProfile}>
            <header className={`${styles.profileHeader} ${isScrolled ? styles.small : ''}`}>
                <div className={styles.stickyContainer}>
                    <div className={styles.headerContentWrapper}>
                        <h1 className={styles.mainHeading}>
                            {currencyHistory?.baseCurrency.label}{' '}
                            <span className={`${styles.code} mono`}>
                                {currencyHistory.baseCurrency.currencyCode.toUpperCase()}
                            </span>
                        </h1>
                        <div className={styles.subheaderWrapper}>
                            <h3 className={styles.subHeading}>{new Date().toDateString()} — Weekly View</h3>
                            {/* <input type="text" className={styles.search} placeholder="Search..." /> */}
                        </div>
                    </div>
                </div>
            </header>

            <div className={styles.content}>
                <div className={styles.conversions}>
                    {filterAndSortCurrencies().map(currency => (
                        <ConversionCard
                            key={currency.currencyCode}
                            currencyCode={currency.currencyCode}
                            rates={currency.conversionHistory}
                        />
                    ))}
                </div>

                {!showAllCurrencies && (
                    <button className={styles.showAll} onClick={() => setShowAllCurrencies(true)}>
                        Show All Currencies
                    </button>
                )}

                {showAllCurrencies && (
                    <section className={styles.allCurrencies}>
                        <h2 className={styles.sectionHeading}>All Currencies</h2>
                        <div className={styles.conversions}>
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
            </div>

            <SVGGradientDefs />
            <Tooltip {...tooltipProps} />
        </div>
    );
};
