import { ExtractFnReturnType, QueryConfig } from '@lib/react-query';
import { GetLessonAPIResponse } from '../types';
import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export type LessonType = 'writing' | 'multi' | 'mixed';
export type LessonLevel = 'vowels' | 'basic' | 'intermediate' | 'full';

export const getLesson = (
    lessonLevel: LessonLevel,
    lessonType: LessonType = 'multi'
): Promise<GetLessonAPIResponse> => {
    return axios.get(`/v1/lesson/hiragana/${lessonLevel}/${lessonType}`);
};

type QueryFnType = typeof getLesson;

type LessonQueryOptions = {
    lessonLevel: LessonLevel;
    lessonType: LessonType;
    config?: QueryConfig<QueryFnType>;
};

export const lessonQuery = ({ config, lessonLevel, lessonType }: LessonQueryOptions) => ({
    ...config,
    queryKey: ['lesson'],
    queryFn: () => getLesson(lessonLevel, lessonType),
});

export const useLesson = ({ config, lessonLevel, lessonType }: LessonQueryOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>(lessonQuery({ config, lessonLevel, lessonType }));
};
