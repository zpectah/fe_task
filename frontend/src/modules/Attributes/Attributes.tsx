import { useEffect } from 'react';
import { useLabelsItems } from '../../hooks';
import { ViewLayout } from '../../components';
import { AttributesContextProvider } from './contexts';
import { useAttributesContextControl } from './hooks';
import { AttributesList } from './AttributesList';
import { AttributesDetail } from './AttributesDetail';

const Attributes = () => {
  const { labels } = useLabelsItems();
  const providerValue = useAttributesContextControl();

  const deleteHandler = (id: string, callback?: () => void) => {
    console.log('on delete', id);

    // TODO - this is callback after api call
    callback?.();
  };

  useEffect(() => providerValue.setLabels(labels), [labels]);

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
