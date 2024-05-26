import { useAttributesItems } from '../../../hooks';
import { useAttributesContext } from '../contexts';
import AttributesListFilter from './AttributesListFilter';
import AttributesListTable from './AttributesListTable';

interface AttributesListProps {
  onDelete: (id: string, callback?: () => void) => void;
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
    onDelete(id, () => {
      console.log('My callback from LIST');
    });
  };

  return (
    <>
      {isLoading ? 'loading' : 'loaded'}
      <AttributesListFilter />
      <AttributesListTable attributes={items} onRowDelete={deleteHandler} hasNextPage={meta?.hasNextPage} />
    </>
  );
};

export default AttributesList;
