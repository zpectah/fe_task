import { Stack, Button, StackProps, ButtonProps } from '@mui/material';
import { useAttributesContext } from '../contexts';

interface AttributesListPaginationProps {
  hasNextPage: boolean;
  stackProps?: Partial<StackProps>;
  buttonProps?: Partial<ButtonProps>;
  prevLabel?: string;
  nextLabel?: string;
}

const AttributesListPagination = ({
  hasNextPage,
  stackProps,
  buttonProps,
  prevLabel = 'Previous',
  nextLabel = 'Next',
}: AttributesListPaginationProps) => {
  const { offset, limit, setOffset } = useAttributesContext();

  const paginationButtonProps: ButtonProps = {
    variant: 'outlined',
    color: 'secondary',
    ...buttonProps,
  };

  const previousPageHandler = () => {
    if (offset > limit) {
      setOffset(offset - limit);
    } else {
      setOffset(0);
    }
  };

  const nextPageHandler = () => {
    if (hasNextPage) {
      setOffset(offset + limit);
    }
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" {...stackProps}>
      <Button onClick={previousPageHandler} disabled={offset === 0} {...paginationButtonProps}>
        {prevLabel}
      </Button>
      <Button onClick={nextPageHandler} disabled={!hasNextPage} {...paginationButtonProps}>
        {nextLabel}
      </Button>
    </Stack>
  );
};

export default AttributesListPagination;
