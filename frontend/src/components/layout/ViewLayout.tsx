import { styled, Box, Container, BoxProps, ContainerProps } from '@mui/material';
import { WithChildren } from '../../types';
import { CONTAINER_MAX_WIDTH_DEFAULT } from '../../constants';

const Wrapper = styled(Box)({
  width: '100%',

  flex: 1, // TODO
});

interface ViewLayoutProps extends WithChildren {
  maxWidth?: ContainerProps['maxWidth'];
  wrapperProps?: Partial<BoxProps>;
  containerProps?: Partial<Omit<ContainerProps, 'maxWidth'>>;
}

const ViewLayout = ({
  maxWidth = CONTAINER_MAX_WIDTH_DEFAULT,
  children,
  wrapperProps,
  containerProps,
}: ViewLayoutProps) => {
  return (
    <Wrapper {...wrapperProps}>
      <Container maxWidth={maxWidth} {...containerProps}>
        {children}
      </Container>
    </Wrapper>
  );
};

export default ViewLayout;
