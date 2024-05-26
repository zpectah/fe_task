import { useQuery, useMutation } from '@tanstack/react-query';
import { useAxiosInstance } from './useAxiosInstance';
import { Attribute, AttributeList, AttributesFilter, AttributesMeta } from '../types';
import { API_EP } from '../constants';
import { useEffect, useState } from 'react';

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

export const useAttributesItems = ({ offset, limit, searchText, sortBy, sortDir }: AttributesFilter) => {
  const [attributes, setAttributes] = useState<AttributeList>([]);

  const { data, ...rest } = useAttributes({
    offset,
    limit,
    searchText,
    sortBy,
    sortDir,
  });

  useEffect(() => {
    if (data)
      setAttributes(
        Array.from([...attributes, ...data].reduce((map, obj) => map.set(obj.id, obj), new Map()).values())
      );
  }, [data]);

  return {
    items: attributes,
    ...rest,
  };
};
