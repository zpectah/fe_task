import { ViewLayout } from '../../components';
import { AttributesList } from './AttributesList';
import { AttributesDetail } from './AttributesDetail';

const Attributes = () => {
  return (
    <ViewLayout>
      <AttributesList />
      <AttributesDetail />
    </ViewLayout>
  );
};

export default Attributes;
