import { QueryClient } from '@tanstack/react-query';
import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import { getAuthorProfileQuery } from '../../api/getAuthorProfile';
import { AuthorProfile } from '../../types';

export const authorProfileLoader = (queryClient: QueryClient) =>
    (async ({ params }: LoaderFunctionArgs) => {
        if (params.authorName) {
            const query = getAuthorProfileQuery(params.authorName);
            return queryClient.ensureQueryData<AuthorProfile>([query.queryKey]);
        }
    }) satisfies LoaderFunction;
