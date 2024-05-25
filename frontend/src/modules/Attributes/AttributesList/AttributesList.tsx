import { Link } from 'react-router-dom';
import { useAttributes } from '../../../hooks';
import { ROUTES } from '../../../constants';

interface AttributesListProps {
  onDelete: (id: string, callback?: Function) => void;
}

const AttributesList = ({ onDelete }: AttributesListProps) => {
  const { data, meta, isLoading } = useAttributes();

  const deleteHandler = (id: string) => {
    onDelete(id, () => {
      console.log('My callback from LIST');
    });
  };

  return (
    <>
      {isLoading ? 'loading' : 'loaded'}
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
    </>
  );
};

export default AttributesList;
