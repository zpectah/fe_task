import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { AttributeList } from '../../../types';
import { ATTRIBUTES_SEARCH_MIN_LENGTH, ROUTES } from '../../../constants';
import { useAttributesContext } from '../contexts';
import { LabelsList } from '../components';

import { InfiniteScroll } from '../../../components';

interface AttributesListTableProps {
  attributes: AttributeList;
  onRowDelete: (id: string) => void;
  hasNextPage: boolean;
  isLoading?: boolean;
}

const AttributesListTable = ({ attributes = [], onRowDelete, hasNextPage, isLoading }: AttributesListTableProps) => {
  const { offset, limit, searchText, setOffset } = useAttributesContext();

  const nextPageHandler = useCallback(() => {
    if (hasNextPage) setOffset(offset + limit);
  }, [hasNextPage, offset, limit]);

  return (
    <Box id="scrollableDiv" sx={{ height: '100%', overflowY: 'scroll' }}>
      <InfiniteScroll onNext={nextPageHandler} hasMore={hasNextPage} isLoading={isLoading}>
        <TableContainer component={Paper}>
          <Table aria-label="attributes table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Labels</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attributes.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      component={Link}
                      to={`${ROUTES.attributes.path}/${row.id}`}
                      sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                    >
                      {row.name} / {row.id} | {row.deleted ? 'deleted' : 'ok'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <LabelsList
                      labelIds={row.labelIds}
                      stackProps={{ direction: 'row', gap: 1 }}
                      chipProps={{ size: 'small', variant: 'outlined' }}
                    />
                  </TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell align="right">
                    <Button size="small" color="error" onClick={() => onRowDelete(row.id)}>
                      Delete
                    </Button>
                    <Button size="small" component={Link} to={`${ROUTES.attributes.path}/${row.id}`}>
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {searchText.length > ATTRIBUTES_SEARCH_MIN_LENGTH && !isLoading && attributes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>For "{searchText}" nothing was found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
    </Box>
  );
};

export default AttributesListTable;
