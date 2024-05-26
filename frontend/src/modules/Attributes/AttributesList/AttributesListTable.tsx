import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { AttributeList } from '../../../types';
import { ROUTES } from '../../../constants';
import { useAttributesContext } from '../contexts';

interface AttributesListTableProps {
  attributes: AttributeList;
  onRowDelete: (id: string) => void;
  hasNextPage: boolean;
}

const AttributesListTable = ({ attributes = [], onRowDelete, hasNextPage }: AttributesListTableProps) => {
  const { offset, limit, setOffset } = useAttributesContext();

  const nextPageHandler = () => {
    if (hasNextPage) {
      setOffset(offset + limit);
    }
  };

  return (
    <InfiniteScroll
      dataLength={attributes.length}
      next={nextPageHandler}
      hasMore={hasNextPage}
      loader={<>Loading ...</>}
    >
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
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.labelIds}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => onRowDelete(row.id)}>
                    Delete
                  </Button>
                  <Button component={Link} to={`${ROUTES.attributes.path}/${row.id}`} size="small">
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </InfiniteScroll>
  );
};

export default AttributesListTable;
