import { useQuery, useMutation } from '@tanstack/react-query';
import { useAxiosInstance } from './useAxiosInstance';
import { Attribute, AttributeList, AttributesFilter, AttributesMeta } from '../types';
import { API_EP } from '../constants';

export const useAttributes = (filter: AttributesFilter) => {
  const { apiBase } = useAxiosInstance();

  const { data, ...query } = useQuery({
    queryKey: ['attributes', Object.values(filter)],
    queryFn: () => apiBase.get(API_EP.getAttributes, { params: { ...filter } }),
  });

  return {
    data: (data?.data?.data ?? []) as AttributeList,
    meta: data?.data?.meta as AttributesMeta,
    ...query,
  };
};

export const useAttributesDetail = (id?: string) => {
  const { apiBase } = useAxiosInstance();

  const { data, ...query } = useQuery({
    enabled: !!id,
    queryKey: [`attributes`, id],
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
