import { useQuery, useMutation } from '@tanstack/react-query';
import { useAxiosInstance } from './useAxiosInstance';
import { Attribute, AttributeList } from '../types';
import { API_EP } from '../constants';

export const useAttributes = () => {
  const { apiBase } = useAxiosInstance();

  const { data, ...query } = useQuery({
    queryKey: ['attributes'],
    queryFn: () => apiBase.get(API_EP.getAttributes, {}),
  });

  return {
    data: (data?.data?.data ?? []) as AttributeList,
    meta: data?.data?.meta,
    ...query,
  };
};

export const useAttributesDetail = (id?: string) => {
  const { apiBase } = useAxiosInstance();

  const { data, ...query } = useQuery({
    enabled: !!id,
    queryKey: [`attributes-detail-${id}`],
    queryFn: () => apiBase.get(API_EP.getAttributesDetail(id), {}),
  });

  const deleteMutation = useMutation({
    mutationFn: () => apiBase.delete(API_EP.deleteAttributesDetail(id), {}),
  });

  return {
    data: data?.data?.data as Attribute,
    ...query,
    deleteMutation,
  };
};
