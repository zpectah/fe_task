import { useState, ChangeEvent } from 'react';
import { Stack, OutlinedInput, Select, MenuItem } from '@mui/material';
import { AttributeListSortBy, AttributeListSortDir } from '../../../types';
import { useAttributesContext } from '../contexts';

const AttributesListFilter = () => {
  const [searchStringTmp, setSearchStringTmp] = useState('');

  const { setSearchText, sortBy, setSortBy, sortDir, setSortDir, setOffset } = useAttributesContext();

  const searchTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length > 3) {
      setSearchText(value);
      setSearchStringTmp(value);
      setOffset(0);
    } else {
      setSearchText('');
      setSearchStringTmp(value);
    }
  };

  return (
    <Stack direction="row" gap={2}>
      <div>
        <OutlinedInput
          value={searchStringTmp}
          onChange={searchTextHandler}
          slotProps={{
            input: {
              minLength: 3,
            },
          }}
        />
      </div>
      <div>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as AttributeListSortBy)}>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="createdAt">Created</MenuItem>
        </Select>
      </div>
      <div>
        <Select value={sortDir} onChange={(e) => setSortDir(e.target.value as AttributeListSortDir)}>
          <MenuItem value="asc">Ascend</MenuItem>
          <MenuItem value="desc">Descend</MenuItem>
        </Select>
      </div>
    </Stack>
  );
};

export default AttributesListFilter;
