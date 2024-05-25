import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Drawer, Typography, Button, Stack } from '@mui/material';
import { MODAL_CLOSE_DELAY, ROUTES } from '../../../constants';
import { useAttributesDetail } from '../../../hooks';
import AttributeDetailLabels from './AttributeDetailLabels';

interface AttributesDetailProps {
  onDelete: (id: string, callback?: Function) => void;
}

const AttributesDetail = ({ onDelete }: AttributesDetailProps) => {
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useAttributesDetail(id);

  const closeHandler = () => {
    navigate(ROUTES.attributes.path);
    setTimeout(() => setOpen(false), MODAL_CLOSE_DELAY);
  };

  const deleteHandler = (id: string) => {
    onDelete(id, () => {
      console.log('My callback from DETAIL');
    });
  };

  useEffect(() => setOpen(!!id), [id]);

  // TODO
  // Handle 404 error when no data and loaded
  // Handle error when fetching ... ?

  return (
    <Drawer anchor="right" open={open} onClose={closeHandler} sx={{}} slotProps={{}}>
      <div>
        {isLoading ? 'detail loading' : 'loaded'}
        <Typography variant="h4">{data?.name}</Typography>
        <div></div>
        <div>{JSON.stringify(data, null, 2)}</div>
        <div>
          <AttributeDetailLabels labelIds={data?.labelIds} />
        </div>
        <Stack direction="row" gap={2}>
          <Button variant="outlined" onClick={closeHandler}>
            Back to list
          </Button>
          <Button variant="outlined" onClick={() => deleteHandler(data?.id)}>
            Delete
          </Button>
        </Stack>
      </div>
    </Drawer>
  );
};

export default AttributesDetail;
