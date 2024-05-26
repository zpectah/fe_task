import { attributesListSortByKeys, attributesListSortDirKeys } from '../enums';
import { Label } from './labels';

export type Attribute = {
  id: string;
  name: string;
  createdAt: string;
  labelIds: Array<Label['id']>;
  deleted: boolean;
  // TODO #chyba v zadání? = not generic -> Array<Label<"id">>
};

export type AttributeList = Attribute[];

export type AttributeListSortBy = keyof typeof attributesListSortByKeys;
export type AttributeListSortDir = keyof typeof attributesListSortDirKeys;

export interface AttributesFilter {
  offset: number;
  limit: number;
  searchText: string;
  sortBy: AttributeListSortBy;
  sortDir: AttributeListSortDir;
}

export interface AttributesMeta extends AttributesFilter {
  hasNextPage: boolean;
}
