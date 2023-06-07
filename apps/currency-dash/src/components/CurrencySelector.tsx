import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCurrencyContext } from '../providers/CurrencyProvider';
import { useCurrencyList } from '../hooks/useCurrencyList';
import { ChevronSVG } from './vectors/ChevronSVG';
import styles from './CurrencySelector.module.css';

export const CurrencySelector = (): JSX.Element => {
    const [searchText, setSearchText] = useState<string>('');
    const [showList, setShowList] = useState<boolean>(false);
    const { selectedCurrency, setSelectedCurrency } = useCurrencyContext();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const listContainerRef = useRef<HTMLDivElement>(null);
    const { data: currencyList, isLoading, error } = useCurrencyList();

    const filteredCurrencies = useMemo(() => {
        const lowerCaseSearchText = searchText.toLowerCase();

        return currencyList?.filter(
            currency =>
                currency.code.toLowerCase().includes(lowerCaseSearchText) ||
                currency.label.toLowerCase().includes(lowerCaseSearchText)
        );
    }, [currencyList, searchText]);

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>`An error has occured: ${error.message}`</div>;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleLinkClick = (currencyCode: string) => {
        setSearchText('');
        setShowList(false);
        setSelectedCurrency(currencyCode);
    };

    const handleToggleClick = () => {
        setShowList(!showList);

        if (showList == false) {
            if (listContainerRef.current) listContainerRef.current.scrollTop = 0;
            searchInputRef.current?.focus();
        }
    };

    return (
        <div className={styles.wrapper}>
            <div ref={listContainerRef} className={`${styles.listContainer} ${showList ? 'list-showing' : ''}`}>
                <div className={styles.searchWrapper}>
                    <input
                        ref={searchInputRef}
                        className={styles.search}
                        type="text"
                        onInput={handleInputChange}
                        placeholder="Search..."
                        value={searchText}
                    />
                </div>
                <div className={styles.currencies}>
                    {filteredCurrencies?.map(currency => (
                        <Link
                            to={`/currency/${currency.code}`}
                            key={currency.code}
                            className={styles.currency}
                            onClick={() => handleLinkClick(currency.code)}
                        >
                            {currency.label} ({currency.code.toUpperCase()})
                        </Link>
                    ))}
                </div>
            </div>
            <button
                className={`${styles.toggleList} ${showList ? styles.listShowing : ''}`}
                onClick={handleToggleClick}
            >
                <div className={styles.logoSelectedCurrencyWrapper}>
                    <div>{selectedCurrency?.toUpperCase()}</div>
                </div>
                <ChevronSVG />
            </button>
        </div>
    );
};
