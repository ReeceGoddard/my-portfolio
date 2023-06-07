import { HTMLProps, useMemo } from 'react';
import { RateForDate } from '../types';
import { LineChart, LineChartMode } from './LineChart';
import styles from './ConversionCard.module.css';
import { DoubleArrowSVG } from './vectors/DoubleArrowSVG';
import { getRateStrings } from '../utils';

export interface ConversionCardProps extends HTMLProps<HTMLDivElement> {
    currencyCode: string;
    rates: RateForDate[];
}

export type Trend = 'up' | 'down' | 'neutral';

const trendModeMap: { [key in Trend]: LineChartMode } = {
    neutral: 'neutral',
    up: 'positive',
    down: 'negative',
};

export const ConversionCard = ({ currencyCode, rates, ...rest }: ConversionCardProps): JSX.Element => {
    const { trend, percentChanged, mainRate, remainingRate } = useMemo<{
        trend: Trend;
        percentChanged: number;
        mainRate: string;
        remainingRate: string;
    }>(() => {
        const { rate } = rates[0];
        const { rate: previousRate } = rates[rates.length - 1];
        const { mainRate, remainingRate } = getRateStrings(rate);

        let trend: Trend = 'neutral';
        if (rate > previousRate) trend = 'up';
        if (rate < previousRate) trend = 'down';

        const percentChanged = ((rate - previousRate) / rate) * 100;

        return {
            trend,
            percentChanged,
            mainRate,
            remainingRate,
        };
    }, [rates]);

    const mode = trendModeMap[trend] || 'neutral';

    return (
        <div className={styles.conversion} {...rest}>
            <h3 className={styles.mainHeading}>
                <div className={styles.label} title={rates[0].rate.toString()}>
                    <span className={styles.code}>{currencyCode.toUpperCase()}</span>
                    &nbsp;
                    <span className={styles.fade}>=</span>
                    &nbsp;
                    <span className={styles.mainRate}>{mainRate}</span>
                    <span className={styles.fade}>{remainingRate}</span>
                </div>
                <DoubleArrowSVG
                    direction={trend === 'neutral' ? 'right' : trend === 'up' ? 'up' : 'down'}
                    color={trend === 'neutral' ? 'blue' : trend === 'up' ? 'green' : 'red'}
                    className={styles.arrow}
                />
            </h3>
            <h6 className={styles.subHeading}>
                <div className={styles.weeklyDiff}>
                    <div className="percent">{percentChanged.toFixed(3)}%</div>
                </div>
            </h6>
            <LineChart chartData={rates.map(rate => rate.rate).reverse()} mode={mode} className={styles.chart} />
        </div>
    );
};
