import { ViewLayout } from '../../components';
import { AttributesList } from './AttributesList';
import { AttributesDetail } from './AttributesDetail';
import { AttributesContextProvider } from './contexts';
import { useAttributesContextControl } from './hooks';

const Attributes = () => {
  const providerValue = useAttributesContextControl();

  const deleteHandler = (id: string, callback?: () => void) => {
    console.log('on delete', id);

    // TODO - this is callback after api call
    callback?.();
  };

  return (
    <AttributesContextProvider value={providerValue}>
      <ViewLayout>
        <AttributesList onDelete={deleteHandler} />
        <AttributesDetail onDelete={deleteHandler} />
      </ViewLayout>
    </AttributesContextProvider>
  );
};

export default Attributes;
