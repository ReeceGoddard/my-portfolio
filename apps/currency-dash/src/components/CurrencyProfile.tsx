import { QueryClient, useQuery } from '@tanstack/react-query';
import { LoaderFunctionArgs, useParams } from 'react-router-dom';
import './CurrencyProfile.css';
import { fetchCurrencyData } from '../services/CurrencyService';

const currencyDataQuery = (code: string) => ({
    queryKey: ['currency-data', code],
    queryFn: async () => fetchCurrencyData(code),
});

export const loader =
    (queryClient: QueryClient) =>
    async ({ params }: LoaderFunctionArgs) => {
        if (params.currencyCode) {
            const query = currencyDataQuery(params.currencyCode);
            return queryClient.ensureQueryData(query);
        }
    };

export const CurrencyProfile = () => {
    const { currencyCode } = useParams();
    const { data: currencyData, isLoading } = useQuery(currencyDataQuery(currencyCode));

    return (
        <div>
            <div>Profile</div>
            <div className="date">Exchange rates for {currencyData?.date}</div>
            <div className="conversions">
                {currencyData?.conversions.map(conversion => (
                    <div className="conversion" key={conversion.code}>
                        <div>1 {currencyCode}</div>
                        <div>
                            = ${conversion.rate} {conversion.code}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
