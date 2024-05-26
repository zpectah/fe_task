import { createContext, useContext } from 'react';
import { AttributeListSortBy, AttributeListSortDir, AttributesFilter } from '../../../types';
import { attributesListSortByKeys, attributesListSortDirKeys } from '../../../enums';

interface AttributesContext extends AttributesFilter {
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  setSearchText: (searchText: string) => void;
  setSortBy: (sortBy: AttributeListSortBy) => void;
  setSortDir: (sortDir: AttributeListSortDir) => void;
}

const defaultContext: AttributesContext = {
  offset: 0,
  limit: 10,
  searchText: '',
  sortBy: attributesListSortByKeys.name,
  sortDir: attributesListSortDirKeys.asc,
  setOffset: () => {},
  setLimit: () => {},
  setSearchText: () => {},
  setSortBy: () => {},
  setSortDir: () => {},
};

const AttributesContext = createContext(defaultContext);

const AttributesContextProvider = AttributesContext.Provider;
const AttributesContextConsumer = AttributesContext.Consumer;

const useAttributesContext = () => useContext(AttributesContext);

export { AttributesContext, AttributesContextProvider, AttributesContextConsumer, useAttributesContext };
