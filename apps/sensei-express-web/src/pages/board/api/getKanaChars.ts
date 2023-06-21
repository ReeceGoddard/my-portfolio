import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@lib/react-query';
import { GetBoardCharsAPIResponse } from '../types';

export type BoardType = 'hiragana' | 'katakana';

export const getKanaChars = (boardType: BoardType): Promise<GetBoardCharsAPIResponse> => {
    return axios.get(`v1/board/${boardType}`);
};

type QueryFnType = typeof getKanaChars;

type KanaCharsQueryOptions = {
    config?: QueryConfig<QueryFnType>;
    boardType: BoardType;
};

export const kanaCharsQuery = ({ config, boardType }: KanaCharsQueryOptions) => ({
    ...config,
    queryKey: ['kana-chars', boardType],
    queryFn: () => getKanaChars(boardType),
});

export const useKanaChars = ({ config, boardType }: KanaCharsQueryOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>(kanaCharsQuery({ config, boardType }));
};
