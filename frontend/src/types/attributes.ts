import { Label } from './labels';

export type Attribute = {
  id: string;
  name: string;
  createdAt: string; // ISO8601
  // labelIds: Array<Label<"id">>  // TODO #chyba v zadání ? #not generic
  labelIds: Array<Label['id']>;
  deleted: boolean;
};

export type AttributeList = Attribute[];
