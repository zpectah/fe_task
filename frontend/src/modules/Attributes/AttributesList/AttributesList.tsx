import { Link } from 'react-router-dom';
import { useAttributes } from '../../../hooks';
import { ROUTES } from '../../../constants';
import { useAttributesContext } from '../contexts';
import AttributesListFilter from './AttributesListFilter';
import AttributesListPagination from './AttributesListPagination';

interface AttributesListProps {
  onDelete: (id: string, callback?: () => void) => void;
}

const AttributesList = ({ onDelete }: AttributesListProps) => {
  const { offset, limit, searchText, sortBy, sortDir } = useAttributesContext();
  const { data, meta, isLoading } = useAttributes({
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
      <div>
        {data?.map((item) => (
          <div key={item.id}>
            {item.name}
            <Link to={`${ROUTES.attributes.path}/${item.id}`}>link to test detail ...</Link>
            <button onClick={() => deleteHandler(item.id)}>delete</button>
          </div>
        ))}
      </div>
      <br />
      <br />
      <div>{JSON.stringify(meta, null, 2)}</div>
      <AttributesListPagination hasNextPage={meta?.hasNextPage} />
    </>
  );
};

export default AttributesList;
