import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
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

  return {
    data: data?.data?.data as Attribute,
    ...query,
  };
};

export const useDeleteAttributeMutation = (instance: AxiosInstance) =>
  useMutation({
    mutationFn: (id: string) => {
      return instance({
        url: API_EP.deleteAttributesDetail(id),
        method: 'DELETE',
      });
    },
  });

export const useAttributesItems = ({ offset, limit, searchText, sortBy, sortDir }: AttributesFilter) => {
  const [attributes, setAttributes] = useState<AttributeList>([]);

  const { data, isRefetching, ...rest } = useAttributes({
    offset,
    limit,
    searchText,
    sortBy,
    sortDir,
  });

  useEffect(() => {
    if (isRefetching) setAttributes(data);
    if (offset > 0) {
      setAttributes(
        Array.from([...attributes, ...data].reduce((map, obj) => map.set(obj.id, obj), new Map()).values())
      );
    } else {
      setAttributes(data);
    }
  }, [data]);

  return {
    items: attributes,
    isRefetching,
    ...rest,
  };
};
