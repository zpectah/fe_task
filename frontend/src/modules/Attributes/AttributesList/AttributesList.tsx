import { Link } from 'react-router-dom';

const AttributesList = () => {
  return (
    <>
      ...AttributesList...
      <div>
        <Link to={'/attributes/101'}>link to test detail ...</Link>
      </div>
    </>
  );
};

export default AttributesList;
