import { useQuery } from '@tanstack/react-query';
import { useAxiosInstance } from './useAxiosInstance';
import { LabelList, LabelsFilter } from '../types';
import { API_EP } from '../constants';

export const useLabels = (filter: LabelsFilter) => {
  const { apiBase } = useAxiosInstance();

  const { data, ...query } = useQuery({
    queryKey: ['labels', Object.values(filter)],
    queryFn: () => apiBase.get(API_EP.getLabels, { params: { ...filter } }),
  });

  return {
    data: (data?.data?.data ?? []) as LabelList,
    meta: data?.data?.meta,
    ...query,
  };
};
