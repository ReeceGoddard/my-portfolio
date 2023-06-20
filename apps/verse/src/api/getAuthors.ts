import { FetchQueryOptions, QueryClient } from '@tanstack/react-query';
import { GetAuthorsAPIResponse } from '../types';
import { API_BASE } from './consts';

/**
 * Gets a list of author names
 * @returns The array of available author names
 */
export const getAuthors = async (): Promise<string[]> => {
    const resp = await fetch(`${API_BASE}/authors`);
    const data: GetAuthorsAPIResponse = await resp.json();
    if (data.authors === undefined || !(data.authors instanceof Array)) throw new Error('API response error.');

    return data.authors;
};

export const getAuthorsQuery: FetchQueryOptions<string[]> = {
    queryKey: ['authors'],
    queryFn: getAuthors,
};
