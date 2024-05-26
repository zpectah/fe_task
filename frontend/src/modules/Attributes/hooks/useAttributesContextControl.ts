import { useState } from 'react';
import { AttributeListSortBy, AttributeListSortDir } from '../../../types';
import { attributesListSortByKeys, attributesListSortDirKeys } from '../../../enums';
import { ATTRIBUTES_FILTER_LIMIT_DEFAULT, ATTRIBUTES_FILTER_OFFSET_DEFAULT } from '../constants';

export const useAttributesContextControl = () => {
  const [offset, setOffset] = useState(ATTRIBUTES_FILTER_OFFSET_DEFAULT);
  const [limit, setLimit] = useState(ATTRIBUTES_FILTER_LIMIT_DEFAULT);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState<AttributeListSortBy>(attributesListSortByKeys.name);
  const [sortDir, setSortDir] = useState<AttributeListSortDir>(attributesListSortDirKeys.asc);

  return {
    offset,
    setOffset,
    limit,
    setLimit,
    searchText,
    setSearchText,
    sortBy,
    setSortBy,
    sortDir,
    setSortDir,
  };
};
