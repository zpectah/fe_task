import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLabelsItems, useDeleteAttributeMutation, useAxiosInstance, useAttributes } from '../../hooks';
import { ROUTES } from '../../constants';
import { ViewLayout, ConfirmDialog } from '../../components';
import { AttributesContextProvider } from './contexts';
import { useAttributesContextControl } from './hooks';
import { AttributesList } from './AttributesList';
import { AttributesDetail } from './AttributesDetail';

const Attributes = () => {
  const { labels } = useLabelsItems();
  const providerValue = useAttributesContextControl();
  const { apiBase } = useAxiosInstance();
  const deleteMutation = useDeleteAttributeMutation(apiBase);
  const navigate = useNavigate();
  const { id } = useParams();
  const { refetch } = useAttributes({
    offset: providerValue.offset,
    limit: providerValue.limit,
    searchText: providerValue.searchText,
    sortBy: providerValue.sortBy,
    sortDir: providerValue.sortDir,
  });

  const deleteHandler = (id: string) => {
    providerValue.setConfirmId(id);
    providerValue.setConfirmOpen(true);
  };

  const closeHandler = () => {
    providerValue.setConfirmId(null);
    providerValue.setConfirmOpen(false);
  };

  const confirmHandler = () => {
    if (providerValue.confirmId) {
      if (id) navigate(ROUTES.attributes.path);
      deleteMutation.mutate(providerValue.confirmId, {
        onSuccess: () => {
          closeHandler();
          setTimeout(() => {
            refetch();
          }, 250);
        },
      });
    }
  };

  useEffect(() => providerValue.setLabels(labels), [labels]);

  return (
    <AttributesContextProvider value={providerValue}>
      <ViewLayout heading={{ title: 'Attributes' }}>
        <AttributesList onDelete={deleteHandler} />
        <AttributesDetail onDelete={deleteHandler} />
      </ViewLayout>
      <ConfirmDialog
        open={providerValue.confirmOpen}
        onClose={closeHandler}
        onConfirm={confirmHandler}
        title="Delete attribute"
      >
        Are you sure you want delete #{providerValue.confirmId} item?
      </ConfirmDialog>
    </AttributesContextProvider>
  );
};

export default Attributes;
