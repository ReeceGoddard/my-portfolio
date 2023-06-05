import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { HSLA } from '../utils/HSLA';

export interface IThemeContext {
    positiveColor: HSLA;
    neutralColor: HSLA;
    negativeColor: HSLA;
}

const ThemeContext = createContext<IThemeContext>({
    positiveColor: new HSLA(),
    neutralColor: new HSLA(),
    negativeColor: new HSLA(),
});
export const useThemeContext = () => useContext(ThemeContext);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [positiveColor, neutralColor, negativeColor] = useMemo(() => {
        const positive = new HSLA({ hue: 100, saturation: 70, lightness: 40 });
        const neutral = new HSLA({ hue: 200, saturation: 90, lightness: 40 });
        const negative = new HSLA({ hue: 350, saturation: 80, lightness: 45 });
        return [positive, neutral, negative];
    }, []);

    return (
        <ThemeContext.Provider value={{ positiveColor, neutralColor, negativeColor }}>{children}</ThemeContext.Provider>
    );
};
