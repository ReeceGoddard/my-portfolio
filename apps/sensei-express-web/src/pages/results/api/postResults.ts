import { axios } from '@lib/axios';
import { AxiosRequestConfig } from 'axios';

export type Result = {
    userID: string;
    characterID: string;
    isCorrect: boolean;
    userAnswer: string;
};

export type ResultsPostAPIPayload = {
    results: Result[];
};

export type PostResponse = {
    statusCode: number;
    message: string;
};

export const postResults = (
    payload: ResultsPostAPIPayload,
    axiosRequestConfig?: AxiosRequestConfig
): Promise<PostResponse> => {
    return axios.post<ResultsPostAPIPayload, PostResponse>(`/v1/results`, payload, axiosRequestConfig);
};
