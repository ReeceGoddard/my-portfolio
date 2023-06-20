import { FetchQueryOptions } from '@tanstack/react-query';
import { AuthorProfile, GetAuthorProfileAPIResponse } from '../types';
import { API_BASE } from './consts';

/**
 * Gets a list of poems for a given author
 * @returns An array of poems for the given author
 */
export const getAuthorProfile = async (authorName: string): Promise<AuthorProfile> => {
    const resp = await fetch(`${API_BASE}/author/${authorName}`);
    const data: GetAuthorProfileAPIResponse = await resp.json();
    if (!(data instanceof Array)) throw new Error('API response error.');

    const authorProfile: AuthorProfile = data.map(poem => ({
        title: poem.title,
        author: poem.author,
        lines: poem.lines,
        lineCount: Number(poem.lineCount),
    }));

    return authorProfile;
};

export const getAuthorProfileQuery = (authorName: string): FetchQueryOptions<AuthorProfile> => {
    const authorProfileQuery: FetchQueryOptions<AuthorProfile> = {
        queryKey: ['authorProfile', authorName],
        queryFn: () => getAuthorProfile(authorName),
    };

    return authorProfileQuery;
};
