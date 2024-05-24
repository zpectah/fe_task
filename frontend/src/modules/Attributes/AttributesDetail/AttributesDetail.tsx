import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Drawer } from '@mui/material';

const AttributesDetail = () => {
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const closeHandler = () => {
    navigate('/attributes');
    setTimeout(() => {
      setOpen(false);
    }, 250);
  };

  useEffect(() => setOpen(!!id), [id]);

  return (
    <>
      <Drawer anchor="right" open={open} onClose={closeHandler}>
        ... Drawer detail content ...
      </Drawer>
    </>
  );
};

export default AttributesDetail;
