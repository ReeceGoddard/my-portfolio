import { HTMLProps, MouseEvent, useCallback, useMemo } from 'react';
import { useCurrencyContext } from '../providers/CurrencyProvider';
import { HSLA } from '../utils/HSLA';
import styles from './LineChart.module.css';
import { getDaysOfTheWeekLetters } from '../utils';

export type LineChartMode = 'neutral' | 'negative' | 'positive';

export interface LineChartProps extends HTMLProps<HTMLDivElement> {
    chartData: number[];
    heightRatio?: number;
    margin?: number;
    mode?: LineChartMode;
}

export const LineChart: React.FC<LineChartProps> = ({
    chartData,
    heightRatio = 0.25,
    margin = 3,
    mode = 'neutral',
    ...rest
}): JSX.Element => {
    const { setTooltipProps, hideTooltip } = useCurrencyContext();
    const VIEWBOX_WIDTH = 128;
    const VIEWBOX_HEIGHT = useMemo(() => VIEWBOX_WIDTH * heightRatio, [heightRatio]);
    const maxValue = useMemo(() => Math.max(...chartData), [chartData]);
    const minValue = useMemo(() => Math.min(...chartData), [chartData]);

    const xScale = useCallback(
        (index: number) => (index * VIEWBOX_WIDTH) / (chartData.length - 1),
        [chartData, VIEWBOX_WIDTH]
    );
    const yScale = useCallback(
        (value: number) => VIEWBOX_HEIGHT - ((value - minValue) * VIEWBOX_HEIGHT) / (maxValue - minValue),
        [VIEWBOX_HEIGHT, minValue, maxValue]
    );

    const { lineColor, gradientColor } = useMemo<{ lineColor: HSLA; gradientColor: HSLA }>(() => {
        if (mode === 'negative') {
            const lineColor = new HSLA({ hue: 350, saturation: 80, lightness: 45 });
            const gradientColor = new HSLA({ ...lineColor.getHSL(), alpha: 0.1 });
            return { lineColor, gradientColor };
        }

        if (mode === 'positive') {
            const lineColor = new HSLA({ hue: 100, saturation: 70, lightness: 40 });
            const gradientColor = new HSLA({ ...lineColor.getHSL(), alpha: 0.5 });
            return { lineColor, gradientColor };
        }

        // Neutral default
        const lineColor = new HSLA({ hue: 200, saturation: 90, lightness: 40 });
        const gradientColor = new HSLA({ ...lineColor.getHSL(), alpha: 0.5 });
        return { lineColor, gradientColor };
    }, [mode]);

    // Build line path from data
    const linePath = useMemo(() => {
        return chartData
            .map((value, index) => {
                const x = xScale(index);
                const y = yScale(value);
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ');
    }, [chartData, xScale, yScale]);

    const linearRegressionLinePath = useMemo(() => {
        const sum = chartData.reduce((acc, value) => acc + value, 0);
        const average = sum / chartData.length;
        const xValues = Array.from({ length: chartData.length }, (_, i) => xScale(i));
        const yValues = chartData.map(value => value - average);
        const covariance = xValues.reduce((acc, _, i) => acc + xValues[i] * yValues[i], 0);
        const variance = xValues.reduce((acc, _, i) => acc + xValues[i] * xValues[i], 0);
        const slope = covariance / variance;
        const yIntercept = average - (slope * (chartData.length - 1)) / 2;

        const trendlinePoints = xValues.map((x, i) => ({
            x: (x / (chartData.length - 1)) * VIEWBOX_WIDTH,
            y: VIEWBOX_HEIGHT - ((slope * x + yIntercept) / (chartData.length - 1)) * VIEWBOX_HEIGHT,
        }));

        const pathString = trendlinePoints.reduce(
            (path, point, index) => (index === 0 ? `M${point.x},${point.y}` : `${path} L${point.x},${point.y}`),
            ''
        );

        return pathString;
    }, [chartData, xScale, VIEWBOX_WIDTH, VIEWBOX_HEIGHT]);

    // Build area path from line path
    const areaPath = useMemo(() => {
        const firstX = xScale(0);
        const firstY = VIEWBOX_HEIGHT;
        const lastX = xScale(chartData.length - 1);
        const lastY = VIEWBOX_HEIGHT;
        const lineSegment = `L ${lastX} ${lastY}`;
        return `${linePath} ${lineSegment} L ${lastX} ${firstY} L ${firstX} ${firstY} Z`;
    }, [chartData, linePath, VIEWBOX_HEIGHT, xScale]);

    const handleMouseEnterCircle = (event: MouseEvent<SVGCircleElement>, value: number) => {
        const GAP = 10;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = +rect.left.toFixed(0) + rect.width / 2;
        const y = +rect.top.toFixed(0) + rect.height + window.scrollY + GAP;
        setTooltipProps({ value, position: { x, y }, hidden: false });
    };

    const handleMouseLeaveCircle = () => {
        hideTooltip();
    };

    return (
        <div {...rest}>
            <svg
                width="100%"
                viewBox={`-${margin} -${margin} ${VIEWBOX_WIDTH + margin * 2} ${VIEWBOX_HEIGHT + margin * 2}`}
            >
                <path fill={`url(#${mode}-area-gradient)`} d={areaPath} />
                <path fill={`url(#${mode}-area-radial-gradient)`} d={areaPath} />
                <path
                    className="linear-regression"
                    stroke="rgba(0,0,0,0.3)"
                    strokeWidth={0.5}
                    d={linearRegressionLinePath}
                />
                <path fill="none" stroke={lineColor.getHSLAString()} strokeWidth={1} d={linePath} />
                {chartData.map((value, index) => {
                    const x = xScale(index);
                    const y = yScale(value);
                    return (
                        <g key={`${index}-${value}`}>
                            <circle
                                cx={x}
                                cy={y}
                                r={2.5}
                                stroke={lineColor.getHSLAString()}
                                fill="white"
                                onMouseEnter={event => handleMouseEnterCircle(event, value)}
                                onMouseLeave={handleMouseLeaveCircle}
                            />
                        </g>
                    );
                })}
            </svg>
            <div className={styles.days}>
                {getDaysOfTheWeekLetters().map((day, index) => (
                    <div className={styles.day} key={`${index}${day}`}>
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};
