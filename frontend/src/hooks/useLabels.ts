import { useQuery } from '@tanstack/react-query';
import { useAxiosInstance } from './useAxiosInstance';
import { LabelList } from '../types';
import { API_EP } from '../constants';

export const useLabels = () => {
  const { apiBase } = useAxiosInstance();

  const { data, ...query } = useQuery({
    queryKey: ['labels'],
    queryFn: () => apiBase.get(API_EP.getLabels, {}),
  });

  return {
    data: (data?.data?.data ?? []) as LabelList,
    meta: data?.data?.meta,
    ...query,
  };
};
