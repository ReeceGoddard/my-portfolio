import { QueryClient } from '@tanstack/react-query';
import { LoaderFunction } from 'react-router-dom';
import { authorsQuery } from '../../api/getAuthors';
import { Authors } from '../../types';

export const authorsLoader = (queryClient: QueryClient) =>
    (async () => {
        return queryClient.ensureQueryData<Authors>([authorsQuery.queryKey]);
    }) satisfies LoaderFunction;
