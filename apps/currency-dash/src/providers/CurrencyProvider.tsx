import React, { createContext, useState, ReactNode, useContext } from 'react';
import { TooltipProps } from '../components/Tooltip';

export interface ICurrencyContext {
    selectedCurrency: string | null;
    setSelectedCurrency: (currency: string) => void;
    tooltipProps: TooltipProps;
    setTooltipProps: (tooltipProps: TooltipProps) => void;
    hideTooltip: () => void;
}

const CurrencyContext = createContext<ICurrencyContext>({
    selectedCurrency: null,
    setSelectedCurrency: () => {},
    tooltipProps: { value: '', position: { x: -100, y: -100 }, hidden: true },
    setTooltipProps: () => {},
    hideTooltip: () => {},
});
export const useCurrencyContext = () => useContext(CurrencyContext);

interface CurrencyProviderProps {
    children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
    const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
    const [tooltipProps, setTooltipProps] = useState<TooltipProps>({
        value: '',
        position: { x: -100, y: -100 },
        hidden: true,
    });

    const hideTooltip = () => {
        setTooltipProps({ ...tooltipProps, position: { x: -1000, y: -1000 }, hidden: true });
    };

    return (
        <CurrencyContext.Provider
            value={{ selectedCurrency, setSelectedCurrency, tooltipProps, setTooltipProps, hideTooltip }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};
