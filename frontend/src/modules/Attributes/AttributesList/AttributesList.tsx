import { useAttributesItems } from '../../../hooks';
import { useAttributesContext } from '../contexts';
import AttributesListFilter from './AttributesListFilter';
import AttributesListTable from './AttributesListTable';
import { Stack } from '@mui/material';

interface AttributesListProps {
  onDelete: (id: string) => void;
}

const AttributesList = ({ onDelete }: AttributesListProps) => {
  const { offset, limit, searchText, sortBy, sortDir } = useAttributesContext();
  const { items, meta, isLoading } = useAttributesItems({
    offset,
    limit,
    searchText,
    sortBy,
    sortDir,
  });

  const deleteHandler = (id: string) => {
    onDelete(id);
  };

  return (
    <Stack direction="column" gap={2}>
      {/* TODO {isLoading ? 'loading' : 'loaded'}*/}
      <AttributesListFilter />
      <AttributesListTable
        attributes={items}
        onRowDelete={deleteHandler}
        hasNextPage={meta?.hasNextPage}
        isLoading={isLoading}
      />
    </Stack>
  );
};

export default AttributesList;
