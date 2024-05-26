import { useState } from 'react';
import { AttributeListSortBy, AttributeListSortDir, LabelList } from '../../../types';
import { attributesListSortByKeys, attributesListSortDirKeys } from '../../../enums';
import { ATTRIBUTES_FILTER_LIMIT_DEFAULT } from '../../../constants';

export const useAttributesContextControl = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(ATTRIBUTES_FILTER_LIMIT_DEFAULT);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState<AttributeListSortBy>(attributesListSortByKeys.name);
  const [sortDir, setSortDir] = useState<AttributeListSortDir>(attributesListSortDirKeys.asc);
  const [labels, setLabels] = useState<LabelList>([]);

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
    labels,
    setLabels,
  };
};
