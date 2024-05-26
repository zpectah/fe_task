import { useState, ChangeEvent } from 'react';
import {
  Stack,
  OutlinedInput,
  Select,
  MenuItem,
  Paper,
  Toolbar,
  InputAdornment,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AttributeListSortBy, AttributeListSortDir } from '../../../types';
import { ATTRIBUTES_SEARCH_MIN_LENGTH } from '../../../constants';
import { useAttributesContext } from '../contexts';

const sortByOptions = [
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'createdAt',
    label: 'Created At',
  },
];

const sortDirOptions = [
  {
    value: 'asc',
    label: 'Ascend',
  },
  {
    value: 'desc',
    label: 'Descend',
  },
];

const AttributesListFilter = () => {
  const [searchStringTmp, setSearchStringTmp] = useState('');

  const { setSearchText, sortBy, setSortBy, sortDir, setSortDir, setOffset, offset } = useAttributesContext();

  const searchTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length > ATTRIBUTES_SEARCH_MIN_LENGTH) {
      setSearchText(value);
      setSearchStringTmp(value);
      setOffset(0);
    } else {
      setSearchText('');
      setSearchStringTmp(value);
      setOffset(offset);
    }
  };

  const sortByHandler = (event: SelectChangeEvent<'name' | 'createdAt'>) => {
    setSortBy(event.target.value as AttributeListSortBy);
    setOffset(0);
  };

  const sortDirectionHandler = (event: SelectChangeEvent<'asc' | 'desc'>) => {
    setSortDir(event.target.value as AttributeListSortDir);
    setOffset(0);
  };

  const clearSearchHandler = () => {
    setSearchText('');
    setSearchStringTmp('');
    setOffset(0);
  };

  return (
    <Paper>
      <Toolbar>
        <Stack direction="row" gap={2}>
          <div>
            <OutlinedInput
              value={searchStringTmp}
              onChange={searchTextHandler}
              slotProps={{
                input: {
                  minLength: ATTRIBUTES_SEARCH_MIN_LENGTH,
                },
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    sx={{ opacity: searchStringTmp.length > 1 ? 1 : 0 }}
                    onClick={clearSearchHandler}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div>
            <Select value={sortBy} onChange={sortByHandler}>
              {sortByOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <Select value={sortDir} onChange={sortDirectionHandler}>
              {sortDirOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        </Stack>
      </Toolbar>
    </Paper>
  );
};

export default AttributesListFilter;
